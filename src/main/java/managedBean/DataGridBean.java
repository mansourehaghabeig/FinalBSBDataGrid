package managedBean;

import javax.inject.Named;
import javax.enterprise.context.SessionScoped;
import java.io.Serializable;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.annotation.ManagedBean;
import javax.faces.model.ArrayDataModel;
import javax.faces.model.DataModel;

/**
 * A managed bean for handling JSF page
 *
 * @author Mansoureh
 */
/**
 * Annotation for changing the current class to a Managed Bean class
 */
@ManagedBean
/**
 * Annotation for giving a name to current class to be used in JSF page
 */
@Named(value = "dataGridBean")
/**
 * Annotation for specifying the scope of Managed Bean class
 */
@SessionScoped
public class DataGridBean implements Serializable {

    /**
     * Creates a new instance of DataGridBean
     */
    public DataGridBean() { }
    
   
    
    /**
     * An array of nested class DataGrid Filled with arbitrary data to be showed
     * in JSF page
     */
    private static DataGrid[] dataGridList = new DataGrid[]{
        new DataGrid("2016/1", "PZOON-Odw. Dorosły", "01.01.2016", "Bydgoszcz",
        "BANANOWSKI", "TOMASZ", "Ciechocinek"),
       new DataGrid("2016/1", "PZOON-Odw. Dorosły", "04.04.2016", "Aleksandrów Kujawski",
       "LUPA", "LESZEK", "Ciechocinek"),
        new DataGrid("54444/2014", "PZOON-Odw. Dorosły", "22.07.2014", "Toruń",
       "ZMARZLINA", "WŁADYSŁAWA", "Bądkowo"),
        new DataGrid("54316/2014", "PZOON-Odw. Dorosły", "15.07.2014", "Warszawa",
       "HERING", "TOBIASZ", "Waganiec"),
       new DataGrid("	54352/2014", "PZOON-Odw. Dorosły", "10.07.2014", "Rynaszewo",
        "KEMPA", "MARIA", "Aleksandrów Kujawski"),
       new DataGrid("54235/2014", "PZOON-Odw. Dorosły", "10.07.2014", "Aleksandrów Kujawski",
        "RAMBOBLI", "DAMIAN", "Świecie"),
        new DataGrid("54242/2014", "PZOON-Odw. Dorosły", "10.07.2014", "Aleksandrów Kujawski",
       "LĘŚ", "MAGDA", "Aleksandrów Kujawski"),
        new DataGrid("54241/2014", "PZOON-Odw. Dorosły", "10.07.2014", "Aleksandrów Kujawski",
        "NIEZGODA", "RAFAŁ", "Topólno"),
        new DataGrid("54251/2014", "PZOON-Odw. Dorosły", "10.07.2014", "Aleksandrów Kujawski",
       "RĘBAŁA", "ZOFIA", "Ciechocinek"),
        new DataGrid("54234/2014", "PZOON-Odw. Dorosły", "10.07.2014", "Aleksandrów Kujawski",
       "MARKETING", "WŁADYSŁAW", "Ciechocinek"),
       new DataGrid("54224/2014", "PZOON-Odw. Dorosły", "10.07.2014", "Aleksandrów Kujawski",
        "MACIEJOWA", "KRYSTYNA", "Aleksandrów Kujawski"),
       new DataGrid("54166/2014", "PZOON-Odw. Dorosły", "10.07.2014", "Aleksandrów Kujawski",
        "ALBATROS", "PRZEMYSŁAW", "Ciechocinek"),
       new DataGrid("54167/2014", "PZOON-Odw. Dorosły", "10.07.2014", "Aleksandrów Kujawski",
       "GDĘC", "BARBARA", "Nieszawa"),};
    

    /**
     * Defines a dataModel from dataGridList It is need to give each row in JSF
     * data table a unique index
     */
    private DataModel<DataGrid> dataModel = new ArrayDataModel<>(dataGridList);

    /**
     * Return back the dataModel of nested class DataGrid
     *
     * @return DataModel<DataGrid>
     */
    public DataModel<DataGrid> getDataList() {
        return dataModel;
    }
    

    /**
     * Nested class DataGrid to define fields of JSF DataGrid
     */
    public static class DataGrid {

        /**
         * Fields of JSF DataGrid
         */
        String numbrSprawy;
        String typSprawy;
        String rozpoczcia;
        String zespol;
        String nazwisko;
        String imie;
        String miasto;

        public DataGrid() { }
        
        

        /**
         * Create a new instance of DataGrid class
         *
         * @param numbrSprawy
         * @param typSprawy
         * @param rozpoczcia
         * @param zespol
         * @param nazwisko
         * @param imie
         * @param miasto
         */
        public DataGrid(String numbrSprawy, String typSprawy, String rozpoczcia, String zespol, String nazwisko, String imie, String miasto) {
            this.numbrSprawy = numbrSprawy;
            this.typSprawy = typSprawy;
            this.rozpoczcia = rozpoczcia;
            this.zespol = zespol;
            this.nazwisko = nazwisko;
            this.imie = imie;
            this.miasto = miasto;
        }

        /**
         * Setters and Getters for the DataGrid class
         */
        
        public String getNumbrSprawy() {
            return numbrSprawy;
        }

        public void setNumbrSprawy(String numbrSprawy) {
            this.numbrSprawy = numbrSprawy;
        }

        public String getTypSprawy() {
            return typSprawy;
        }

        public void setTypSprawy(String typSprawy) {
            this.typSprawy = typSprawy;
        }

        public String getRozpoczcia() {
            return rozpoczcia;
        }

        public void setRozpoczcia(String rozpoczcia) {
            this.rozpoczcia = rozpoczcia;
        }

        public String getZespol() {
            return zespol;
        }

        public void setZespol(String zespol) {
            this.zespol = zespol;
        }

        public String getNazwisko() {
            return nazwisko;
        }

        public void setNazwisko(String nazwisko) {
            this.nazwisko = nazwisko;
        }

        public String getImie() {
            return imie;
        }

        public void setImie(String imie) {
            this.imie = imie;
        }

        public String getMiasto() {
            return miasto;
        }

        public void setMiasto(String miasto) {
            this.miasto = miasto;
        }

    }

}
