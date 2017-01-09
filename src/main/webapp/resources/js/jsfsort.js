addEvent(window, "load", sortables_init);

var SORT_COLUMN_INDEX;
var SORT_COLUMN_INDEX2;
var SORT_COLUMN_KIER;
var SORT_COLUMN_KIER2;
var SORT_COLUMN_SPAN;
var SORT_COLUMN_SPAN2;

function sortables_init() {
    if (!document.getElementsByTagName)
        return;
    tbls = document.getElementsByTagName("table");
    for (ti = 0; ti < tbls.length; ti++) {
        thisTbl = tbls[ti];
        if (((' ' + thisTbl.className + ' ').indexOf("sortable") !== -1) && (thisTbl.id)) {
            ts_makeSortable(thisTbl);
        }
    }
}

function ts_makeSortable(table) {
    if (table.rows && table.rows.length > 0) {
        var firstRow = table.rows[0];
    }
    if (!firstRow)
        return;
    for (var i = 0; i < firstRow.cells.length; i++) {
        var cell = firstRow.cells[i];
        var txt = ts_getInnerText(cell);
        if (!(txt === "")) {
            cell.innerHTML = '<span class="mul_1" ' +
                    'onclick="ts_resortTable1(this, ' + i + ');return false;" ' +
                    'oncontextmenu="ts_resortTable2(this, ' + i + ');return false;" >' +
                    txt + '<span class="mul_2" id="' + i + '" ></span></span>';
        }
    }
}

function ts_getInnerText(el) {
    if (typeof el === "string") {
        return el;
    }
    if (typeof el === "undefined") {
        return el;
    }
    if (el.innerText) {
        return el.innerText;
    }
    var str = "";

    var cs = el.childNodes;
    var l = cs.length;
    for (var i = 0; i < l; i++) {
        switch (cs[i].nodeType) {
            case 1: //ELEMENT_NODE
                str += ts_getInnerText(cs[i]);
                break;
            case 3:	//TEXT_NODE
                str += cs[i].nodeValue;
                break;
        }
    }
    return str;
}

function ts_resortTable1(lnk, clid) {
    SORT_COLUMN_SPAN = lnk;
    for (var ci = 0; ci < lnk.childNodes.length; ci++) {
        if (lnk.childNodes[ci].tagName && lnk.childNodes[ci].tagName.toLowerCase() === 'span')
            SORT_COLUMN_SPAN = lnk.childNodes[ci];
    }
    if ((SORT_COLUMN_SPAN.getAttribute("sortdir") === 'down') || (SORT_COLUMN_SPAN.getAttribute("sortdir") === 'down2')) {
        SORT_COLUMN_KIER = -1;
    } else {
        SORT_COLUMN_KIER = +1;
    }
    SORT_COLUMN_INDEX = parseInt(SORT_COLUMN_SPAN.getAttribute("id"));

    SORT_COLUMN_SPAN2 = SORT_COLUMN_SPAN;
    SORT_COLUMN_INDEX2 = SORT_COLUMN_INDEX;
    SORT_COLUMN_KIER2 = SORT_COLUMN_KIER;

    ts_resortTable(lnk);
    return false;
}

function ts_resortTable2(lnk, clid) {
    for (var ci = 0; ci < lnk.childNodes.length; ci++) {
        if (lnk.childNodes[ci].tagName && lnk.childNodes[ci].tagName.toLowerCase() === 'span')
            SORT_COLUMN_SPAN2 = lnk.childNodes[ci];
    }
    if (SORT_COLUMN_SPAN2.getAttribute("sortdir") === 'down2') {
        SORT_COLUMN_KIER2 = -1;
    } else {
        SORT_COLUMN_KIER2 = 1;
    }
    SORT_COLUMN_INDEX2 = parseInt(SORT_COLUMN_SPAN2.getAttribute("id"));

    SORT_COLUMN_SPAN = SORT_COLUMN_SPAN2;
    SORT_COLUMN_INDEX = SORT_COLUMN_INDEX2;
    SORT_COLUMN_KIER = SORT_COLUMN_KIER2;

    // wyszukaj SORT_COLUMN_INDEX
    var allspans = document.getElementsByTagName("span");
    for (ci = 0; ci < (allspans.length); ci++) {
        span = allspans[ci];
        if (span.className === 'mul_2') {
            if (getParent(span, "table") === getParent(lnk, "table")) { // tylko z tej tabeli
                if (span.getAttribute("sortdir") === 'down') {
                    SORT_COLUMN_INDEX = parseInt(span.getAttribute("id"));
                    SORT_COLUMN_KIER = 1;
                    SORT_COLUMN_SPAN = span;
                }
                if (span.getAttribute("sortdir") === 'up') {
                    SORT_COLUMN_INDEX = parseInt(span.getAttribute("id"));
                    SORT_COLUMN_KIER = -1;
                    SORT_COLUMN_SPAN = span;
                }
            }
        }
    }
    if (SORT_COLUMN_INDEX === SORT_COLUMN_INDEX2) {
        SORT_COLUMN_KIER = -SORT_COLUMN_KIER;
    }
    ts_resortTable(lnk);
    return false;
}

function ts_resortTable(lnk) {
    var td = lnk.parentNode;
    var table = getParent(td, 'TABLE');
    tbody = table.tBodies[0];
    if (table.rows.length <= 1)
        return false;

    var newRowsS = new Array();
    var newRowsS2 = new Array();
    LS = 0;
    var newRowsN = new Array();
    var newRowsN2 = new Array();
    LN = 0;
    var newRowsD = new Array();
    var newRowsD2 = new Array();
    LD = 0;

    if (SORT_COLUMN_INDEX2 === SORT_COLUMN_INDEX) {
        wart_int2 = 0;
        wart_data2 = '00000000';
        wart2 = '';
    }

    for (j = 1; j < table.rows.length - 1; j++) {
        wart = ts_getInnerText(table.rows[j].cells[SORT_COLUMN_INDEX]);

        if (!(SORT_COLUMN_INDEX2 === SORT_COLUMN_INDEX)) {
            wart2 = ts_getInnerText(table.rows[j].cells[SORT_COLUMN_INDEX2]);
            if (wart2.match(/\d+(\.\d)*/)) {
                wart_int2 = parseInt(wart2);
                if (isNaN(wart_int2)) {
                    wart_int2 = 0;
                }
            } else {
                wart_int2 = 0;
            }
            wart_data2 = '00000000';
            if (wart2.length === 10) {
                if (wart2.match(/^\d\d[\/\-\.]\d\d[\/\-\.]\d\d\d\d$/)) {
                    wart_data2 = wart2.substr(6, 4) + wart2.substr(3, 2) + wart2.substr(0, 2);
                }
                //    if (wart2.match(/^\d\d\d\d[\/\-\.]\d\d[\/\-\.]\d\d$/)) {
                //      wart_data2 = wart2.substr(0,4)+wart2.substr(5,2)+wart2.substr(8,2);
                //    }
            }
            wart2 = wart2.toUpperCase();
        }
        wart_typ = 0;
        //      if (wart.match(/^\d\d\d\d[\/\-\.]\d\d[\/\-\.]\d\d$/) && (wart.length == 10)) {
        //      wart_typ = 2;
        //    wart_data = wart.substr(0,4)+wart.substr(5,2)+wart.substr(8,2);
        //    newRowsD2[LD] = [wart_data,wart_int2,wart_data2,wart2];
        //    newRowsD[LD] = newRowsD2[LD].concat(table.rows[j]);
        //    LD=LD+1;
        //  }else{
        if (wart.match(/^\d\d[\/\-\.]\d\d[\/\-\.]\d\d\d\d$/) && (wart.length === 10)) {
            wart_typ = 2;
            wart_data = wart.substr(6, 4) + wart.substr(3, 2) + wart.substr(0, 2);
            newRowsD2[LD] = [wart_data, wart_int2, wart_data2, wart2];
            newRowsD[LD] = newRowsD2[LD].concat(table.rows[j]);
            LD = LD + 1;
        } else {
            if (wart.match(/\d+(\.\d)*/)) {
                wart_typ = 1;
                wart_int = parseInt(wart);
                if (isNaN(wart_int)) {
                    wart_typ = 0;
                } else {
                    newRowsN2[LN] = [wart_int, wart_int2, wart_data2, wart2];
                    newRowsN[LN] = newRowsN2[LN].concat(table.rows[j]);
                    LN = LN + 1;
                }
            }
            if (wart_typ === 0) {
                newRowsS2[LS] = [wart.toUpperCase(), wart_int2, wart_data2, wart2];
                newRowsS[LS] = newRowsS2[LS].concat(table.rows[j]);
                LS = LS + 1;
            }
        }
        //}
    }

    newRowsN.sort(sortppN);
    newRowsD.sort(sortppD);
    newRowsS.sort(sortppS);

    // We appendChild rows that already exist to the tbody, so it moves them rather than creating new ones
    // don't do sortbottom rows
    for (i = 0; i < newRowsN.length; i++) {
        if (!newRowsN[i].className || (newRowsN[i].className && (newRowsN[i].className.indexOf('sortbottom') === -1)))
            tbody.appendChild(newRowsN[i][4]);
    }
    for (i = 0; i < newRowsS.length; i++) {
        if (!newRowsS[i].className || (newRowsS[i].className && (newRowsS[i].className.indexOf('sortbottom') === -1)))
            tbody.appendChild(newRowsS[i][4]);
    }
    for (i = 0; i < newRowsD.length; i++) {
        if (!newRowsD[i].className || (newRowsD[i].className && (newRowsD[i].className.indexOf('sortbottom') === -1)))
            tbody.appendChild(newRowsD[i][4]);
    }

    // do sortbottom rows only

    for (i = 0; i < newRowsN.length; i++) {
        if (newRowsN[i].className && (newRowsN[i].className.indexOf('sortbottom') !== -1))
            tbody.appendChild(newRowsN[i][4]);
    }
    for (i = 0; i < newRowsS.length; i++) {
        if (newRowsS[i].className && (newRowsS[i].className.indexOf('sortbottom') !== -1))
            tbody.appendChild(newRowsS[i][4]);
    }
    for (i = 0; i < newRowsD.length; i++) {
        if (newRowsD[i].className && (newRowsD[i].className.indexOf('sortbottom') !== -1))
            tbody.appendChild(newRowsD[i][4]);
    }

    if (ts_getInnerText(table.rows[0].cells[0]) === "") {
        for (i = 0; i < tbody.rows.length; i++) {
            var rr = tbody.rows[i];
            var cc = rr.cells[0];
            cc.innerHTML = i + 1;
        }
    }
    var allspans = document.getElementsByTagName("span");
    for (var ci = 0; ci < allspans.length; ci++) {
        if (allspans[ci].className === 'mul_2') {
            if (getParent(allspans[ci], "table") === getParent(lnk, "table")) { // in the same table as us?
                allspans[ci].innerHTML = '';
                allspans[ci].setAttribute('sortdir', '');
            }
        }
    }

    if (SORT_COLUMN_INDEX === SORT_COLUMN_INDEX2) {
        if (SORT_COLUMN_KIER === 1) {
            SORT_COLUMN_SPAN.innerHTML = '&darr;';
            SORT_COLUMN_SPAN.setAttribute('sortdir', 'down');
        } else {
            SORT_COLUMN_SPAN.innerHTML = '&uarr;';
            SORT_COLUMN_SPAN.setAttribute('sortdir', 'up');
        }
    } else {
        if (SORT_COLUMN_KIER === 1) {
            SORT_COLUMN_SPAN.innerHTML = '&darr;1';
            SORT_COLUMN_SPAN.setAttribute('sortdir', 'down');
        } else {
            SORT_COLUMN_SPAN.innerHTML = '&uarr;1';
            SORT_COLUMN_SPAN.setAttribute('sortdir', 'up');
        }
        if (SORT_COLUMN_KIER2 === 1) {
            SORT_COLUMN_SPAN2.innerHTML = '&darr;2';
            SORT_COLUMN_SPAN2.setAttribute('sortdir', 'down2');
        } else {
            SORT_COLUMN_SPAN2.innerHTML = '&uarr;2';
            SORT_COLUMN_SPAN2.setAttribute('sortdir', 'up2');
        }

    }
    return false;
}

function sortppS(a, b) {
    if (a[0] === "" && b[0] === "")
        return sortppD2(a, b); //a=b
    if (a[0] === "")
        return SORT_COLUMN_KIER; // a>b
    if (b[0] === "")
        return -SORT_COLUMN_KIER; //a<b
    wynik = SORT_COLUMN_KIER * (a[0].localeCompare(b[0]));
    return (wynik === 0) ? sortppD2(a, b) : wynik;
}

function sortppN(a, b) {
    if (a[0] === b[0])
        return sortppD2(a, b);
    if (a[0] < b[0])
        return -SORT_COLUMN_KIER;
    return SORT_COLUMN_KIER;
}

function sortppD(a, b) {
    if (a[0] === b[0])
        return sortppD2(a, b);
    if (a[0] < b[0])
        return -SORT_COLUMN_KIER;
    return SORT_COLUMN_KIER;
}

function sortppN2(a, b) {
    if (a[1] === b[1])
        return sortppS2(a, b);
    if (a[1] < b[1])
        return -SORT_COLUMN_KIER2;
    return SORT_COLUMN_KIER2;
}

function sortppD2(a, b) {
    if (a[2] === b[2])
        return sortppN2(a, b);
    if (a[2] < b[2])
        return -SORT_COLUMN_KIER2;
    return SORT_COLUMN_KIER2;
}

function sortppS2(a, b) {
    if (a[3] === "" && b[3] === "")
        return 0; //a=b
    if (a[3] === "")
        return SORT_COLUMN_KIER2; // a>b
    if (b[3] === "")
        return -SORT_COLUMN_KIER2; //a<b
    return SORT_COLUMN_KIER2 * a[3].localeCompare(b[3]);
}

function getParent(el, pTagName) {
    if (el === null)
        return null;
    else if (el.nodeType === 1 && el.tagName.toLowerCase() === pTagName.toLowerCase())
        return el;
    else
        return getParent(el.parentNode, pTagName);
}

function addEvent(elm, evType, fn, useCapture)
// addEvent and removeEvent
// cross-browser event handling for IE5+,  NS6 and Mozilla
// By Scott Andrew
{
    if (elm.addEventListener) {
        elm.addEventListener(evType, fn, useCapture);
        return true;
    } else if (elm.attachEvent) {
        var r = elm.attachEvent("on" + evType, fn);
        return r;
    } else {
        alert("Handler could not be removed");
        return false;
    }
}