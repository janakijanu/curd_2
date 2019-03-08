var updateRowCount = 0;
var rowCount = 1;
// Get the modal
var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
document.addEventListener('DOMContentLoaded', load);

function onInit(){
	var rows = document.getElementById('tasksTable').getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
	if(rows>1){
		document.getElementById("tableList").style.display = "block";
	}
	else{
		document.getElementById("tableList").style.display = "none";
	}
}

var countryDetails = {

    "DETAILS_ARRAY": []

};
var editCountryId = "";

function load() {
	document.getElementById("tbodyRowDetails").innerHTML = "";
    var table = document.getElementById("tbodyRowDetails");
    var tr = table.insertRow(-1); // Table row
    var sessionCountryDetails = JSON.parse(sessionStorage.getItem("sessionDetails"));
    if (typeof sessionCountryDetails != "undefined" && sessionCountryDetails != null && sessionCountryDetails) {
        for (var i = 0; sessionCountryDetails.DETAILS_ARRAY.length > i; i++) {
            tr = table.insertRow(-1);
            tr.id = "countrytr_" + sessionCountryDetails.DETAILS_ARRAY[i].ID;
            for (var j in sessionCountryDetails.DETAILS_ARRAY[i]) {
                if (j != "ID") {
                    var tabCell = tr.insertCell(-1);
					tabCell.className = "textAlign";
                    tabCell.innerHTML = sessionCountryDetails.DETAILS_ARRAY[i][j];
                }

                if (j == "DESCRIPTION") {
                    var tabCell = tr.insertCell(-1);
                    tabCell.className = "edit";
                    var editIconField = document.createElement("i");
                    editIconField.className = "fas fa-edit";
                    editIconField.setAttribute("onclick", "editRow(this)");
                    editIconField.id = "edit_" + sessionCountryDetails.DETAILS_ARRAY[i].ID;
                    tabCell.appendChild(editIconField);

                    var tabCell = tr.insertCell(-1);
                    tabCell.className = "delete";
                    var deleteIconField = document.createElement("i");
                    deleteIconField.className = "fas fa-times";
                    deleteIconField.setAttribute("onclick", "delete_row(this)");
                    deleteIconField.id = "delete_" + sessionCountryDetails.DETAILS_ARRAY[i].ID;
                    tabCell.appendChild(deleteIconField);
                }
            }
        }
    } 
	else {

        for (var i = 0; countryDetails.DETAILS_ARRAY.length > i; i++) {
            tr = table.insertRow(-1);
            tr.id = "countrytr_" + countryDetails.DETAILS_ARRAY[i].ID;
            for (var j in countryDetails.DETAILS_ARRAY[i]) {
                if (j != "ID") {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = countryDetails.DETAILS_ARRAY[i][j];
                }
                if (j == "DESCRIPTION") {
                    var tabCell = tr.insertCell(-1);
                    tabCell.className = "edit";
                    var editIconField = document.createElement("i");
                    editIconField.className = "fas fa-edit";
                    editIconField.setAttribute("onclick", "editRow(this)");
                    editIconField.id = "edit_" + countryDetails.DETAILS_ARRAY[i].ID;
                    tabCell.appendChild(editIconField);

                    var tabCell = tr.insertCell(-1);
                    tabCell.className = "delete";
                    var deleteIconField = document.createElement("i");
                    deleteIconField.className = "fas fa-times";
                    deleteIconField.setAttribute("onclick", "delete_row(this)");
                    deleteIconField.id = "delete_" + countryDetails.DETAILS_ARRAY[i].ID;
                    tabCell.appendChild(deleteIconField);

                }
            }
        }
    }
    document.getElementById("countryName").value = "";
    document.getElementById("countryDescription").value = "";
    document.getElementById("tableList").style.display = "block";
    //modal.style.display = "none";
	onInit();
}

function addTasks() {
    editCountryId = "";
    var country = document.getElementById("countryName").value;
    var description = document.getElementById("countryDescription").value;
    var data = {};
    data.ID = countryDetails.DETAILS_ARRAY.length + 1;
    data.COUNTRY = country;
    data.DESCRIPTION = description;
    countryDetails.DETAILS_ARRAY.push(data);
    sessionStorage.setItem("sessionDetails", JSON.stringify(countryDetails));
    load();
}

function updateTasks() {

   if(editCountryId != ""  && typeof editCountryId != "undefined" && editCountryId != null){
           for (var k = 0; countryDetails.DETAILS_ARRAY.length > k; k++) {
            if (editCountryId == countryDetails.DETAILS_ARRAY[k].ID) {
                countryDetails.DETAILS_ARRAY[k].COUNTRY =  document.getElementById("countryName").value;
                countryDetails.DETAILS_ARRAY[k].DESCRIPTION = document.getElementById("countryDescription").value;
            }
        }
   
   }
    document.getElementById("tableList").style.display = "block";
    document.getElementById("saveButton").style.display = "block";
    document.getElementById("updateButton").style.display = "none";
    document.getElementById("countryName").value = "";
    document.getElementById("countryDescription").value = "";
	sessionStorage.setItem("sessionDetails", JSON.stringify(countryDetails));
	load();
}

function delete_row(_deleteRowId) {
     editCountryId = "";
 
     var getDeleteTdId = _deleteRowId.id.split("_");
    var deleteTdId = parseInt(getDeleteTdId[1]);
	    for (var k = 0; countryDetails.DETAILS_ARRAY.length > k; k++) {
        if (deleteTdId == countryDetails.DETAILS_ARRAY[k].ID) {
                  countryDetails.DETAILS_ARRAY.splice(k, 1);
        }
    }
	sessionStorage.setItem("sessionDetails", JSON.stringify(countryDetails));
    load();
}

function editRow(_countryDetails) {
        var getEditTdId = _countryDetails.id.split("_");
    var editTdId = parseInt(getEditTdId[1]);
    editCountryId = editTdId;
	    for (var k = 0; countryDetails.DETAILS_ARRAY.length > k; k++) {
        if (editTdId == countryDetails.DETAILS_ARRAY[k].ID) {
            document.getElementById("countryName").value = countryDetails.DETAILS_ARRAY[k].COUNTRY;
            document.getElementById("countryDescription").value = countryDetails.DETAILS_ARRAY[k].DESCRIPTION;
        }
    }
    document.getElementById("tableList").style.display = "block";
    document.getElementById("saveButton").style.display = "none";
    document.getElementById("updateButton").style.display = "block";
}

function countryName() {
    var name = document.getElementById("countryName").value;
    var description = document.getElementById("countryDescription").value;
    if (name === "" || description === "") {
        document.getElementById("names").innerHTML = "Please Enter The Country Name And Description";
        document.getElementById("names").style.color = "Red";
    } else {
        document.getElementById("names").innerHTML = "";
        addTasks();
    }
}