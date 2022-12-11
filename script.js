let recordList = [];

window.onload = (event) => {
  loadRecord();
  updateRecord();
  updateMoney();
};

const saveSubmit = (event) => {
  event.preventDefault();
  addValue();  
  updateMoney();
  updateRecord();
  saveRecord();
};

const addValue = () => {
  let moneyObj = {};
  let inputValue = document.getElementById("Amount");
  let inputConcept = document.getElementById("Concept");
  moneyObj.value = inputValue.value;
  moneyObj.Concept = inputConcept.value;
  recordList.push(moneyObj);
  resetForm();
};

const resetForm = () =>{
  document.getElementById("Transaction").reset();
}

const updateMoney = () => {
  let Expenses = 0;
  let Incomes = 0;
  let Available = 0;
  for (let item of recordList) {
    Available += Number(parseFloat(item.value).toFixed(2));
    if (item.value < 0) {
      Expenses += -Number(parseFloat(item.value).toFixed(2));
    } else {
      Incomes += Number(parseFloat(item.value).toFixed(2));
    }
  }
  document.getElementById("Available").textContent = (Math.round((Available)  * 100) / 100).toString();
  document.getElementById("Expenses").textContent = (Math.round((Expenses) * 100) / 100).toString();
  document.getElementById("Incomes").textContent = (Math.round((Incomes) * 100) / 100).toString();

};

const DeleteItem = (itemIndex) =>{
  recordList.splice(itemIndex, 1);
  return updateRecord() + updateMoney() + saveRecord()
};

const updateRecord = () => {
  let recordUpdated = "";
  for (let item of recordList) {
    if (item.value < 0) {
      recordUpdated += 
        '<li class="Expenses-P">' +
        item.Concept +
        " ..... " +
        item.value +
        '<span class="close" onclick="DeleteItem('+recordList.indexOf(item)+')">X</span></li>';
    } else {
      recordUpdated +=
        '<li class="Incomes-P">' +
        item.Concept +
        " ..... " +
        item.value +
        '<span class="close" onclick="DeleteItem('+recordList.indexOf(item)+')">X</span></li>';
    } 
  }
  document.getElementById("Record").innerHTML = recordUpdated;
};


const saveRecord = () => {
  localStorage.setItem("save-all", JSON.stringify(recordList));
};

const loadRecord = () => {
  let data = localStorage.getItem("save-all");
  if (data !== null) recordList = JSON.parse(data);
};