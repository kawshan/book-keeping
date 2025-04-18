window.addEventListener('load',function (){

  refreshJournelHeaderForm();

  refreshJournalHeaderTable();



})



const refreshJournelHeaderForm = ()=>{
    journalHeader = new Object();

    selectCompany.style.border="2px solid #ced4da";
    textDate.style.border="2px solid #ced4da";
    textDescription.style.border="2px solid #ced4da";


    textDate.value="";
    textDescription.value="";

    companiesList = ajaxGetRequest("/companyMaster/findAll");
    fillDataIntoSelect(selectCompany,'Select Company',companiesList,'company_master_name')


}


const refreshJournalHeaderTable = ()=>{

    recentHundredJournalList = ajaxGetRequest("/journal-header/getRecentHundredJournalHeaders");

    const displayProperty = [
        {dataType:'function',propertyName:getCompany},
        {dataType:'text',propertyName:'journal_header_key'},
        {dataType:'text',propertyName:'journal_header_date'},
        {dataType:'text',propertyName:'journal_header_description'},
    ];

    if ($.fn.DataTable.isDataTable("#journalHeaderTable")){
        $("#journalHeaderTable").DataTable().destroy();
    }

    fillDataIntoTable(journalHeaderTable,recentHundredJournalList,displayProperty,true,divModifyButton2)
    $("#journalHeaderTable").dataTable();


}


const handelResetJournalHeader = ()=>{
    window.location.reload();
}


const refreshJournalHeaderColorsToDefault = ()=>{
    selectCompany.style.border="2px solid #ced4da";
    textDate.style.border="2px solid #ced4da";
    textDescription.style.border="2px solid #ced4da";
}




const getCompany = (ob) => {
    return ob.company_master_id.company_master_name;
}


const checkErrorsInJournalHeader = ()=>{
    let errors= ""

    if (journalHeader.company_master_id == null){
        errors=errors+"Company cannot Be Empty \n"
    }

    if (journalHeader.journal_header_date == null){
        errors=errors+"Date Cannot Be Empty \n"
    }
    return errors;
}

const refillJournalHeader = (ob)=>{
    journalHeader = JSON.parse(JSON.stringify(ob));
    oldjournalHeader = JSON.parse(JSON.stringify(ob));
}




const checkUpdatesJournalHeader = ()=>{

    let updates = ''

    if (journalHeader.company_master_id.company_master_name != oldjournalHeader.company_master_id.company_master_name){
        updates=updates+"Company Is Updated \n"
    }

    if (journalHeader.journal_header_date != oldjournalHeader.journal_header_date){
        updates=updates+"Date Is Updated \n"
    }

    if (journalHeader.journal_header_description != oldjournalHeader.journal_header_description){
        updates=updates+"Description Is Updated \n"
    }
    return updates;
}







const saveOrUpdateJournalHeader = ()=>{

    if (textCode.value == ""){
        console.log(`save part`);
        let errors = checkErrorsInJournalHeader();
        if (errors==""){
            const userConfirm = confirm(`Are You Sure To Add Following Journal header
            Company Name is ${journalHeader.company_master_id.company_master_name}
            Date Is ${journalHeader.journal_header_date}
            `);
            if (userConfirm){
                const postServerResponse = ajaxPostRequest("/journal-header",journalHeader);
                if (postServerResponse){
                    alert("Save Successful");
                    textCode.value = postServerResponse.journal_header_key;


                    journalHeader.id = postServerResponse.id;
                    journalHeader.journal_header_key = postServerResponse.journal_header_key;



                    refreshJournalHeaderColorsToDefault();
                    refreshJournalHeaderTable();
                }
            }
        }else {
            alert(`You Have Some Errors \n ${errors}`);
        }


    }else {
        console.log("update part");
        let errors = checkErrorsInJournalHeader();
        if (errors==""){
            const userConfirm = confirm(`Are You Sure To Update Following 
            ID is ${journalHeader.id}
            Code Is ${journalHeader.journal_header_key}
            Company Name is ${journalHeader.company_master_id.company_master_name}
            Date Is ${journalHeader.journal_header_date}
            `);
            if (userConfirm){
                const putServerResponse = ajaxPutRequest("/journal-header",journalHeader);
                if (putServerResponse=="ok"){
                    alert("Update Successful");
                    refreshJournalHeaderColorsToDefault();
                    refreshJournalHeaderTable();
                }
            }
        }else {
            alert(`You Have Some Errors \n ${errors}`)
        }


    }


}




const deleteJournalHeader = (ob)=>{
    const userConfirm = confirm(`Are You Sure To Delete Journal
    Company Name is ${ob.company_master_id.company_master_name}
    Date Is ${ob.journal_header_date}
    `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/journal-header",ob);
        if (deleteServerResponse=="ok"){
            alert("Delete Successful");
            divModifyButton2.classList.add("d-none");
            refreshJournalHeaderTable();
        }else {
            alert(`Delete Unsuccessful \n ${deleteServerResponse}`);
        }

    }
}
// need to implement delete journal details when deleting header..










































