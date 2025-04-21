window.addEventListener('load', function () {

    refreshJournelHeaderForm();

    refreshJournalHeaderTable();

    refreshJournalDetailsForm();

})


const refreshJournelHeaderForm = () => {
    journalHeader = new Object();

    selectCompany.style.border = "2px solid #ced4da";
    textDate.style.border = "2px solid #ced4da";
    textDescription.style.border = "2px solid #ced4da";


    textDate.value = "";
    textDescription.value = "";

    companiesList = ajaxGetRequest("/companyMaster/findAll");
    fillDataIntoSelect(selectCompany, 'Select Company', companiesList, 'company_master_name')


    buttonJournalDetailsUpdate.disabled=true;
    buttonJournalDetailsUpdate.style.cursor="not-allowed";


    buttonJournalDetailsAdd.disabled=true;
    buttonJournalDetailsAdd.style.cursor="not-allowed";

}


const customizeLedgerAccounts = (fieldId)=>{
    selectedValue = JSON.parse(fieldId.value);

    const fromAccountServerResponse = ajaxGetRequest(`/ledgerAccount/getByCompanyId/${selectedValue.id}`);
    fillDataIntoSelect(selectLedgerAcc,'Select Ledger Account',fromAccountServerResponse,'ledger_account_name');


}


const refreshJournalHeaderTable = () => {

    recentHundredJournalList = ajaxGetRequest("/journal-header/getRecentHundredJournalHeaders");

    const displayProperty = [
        {dataType: 'function', propertyName: getCompany},
        {dataType: 'text', propertyName: 'journal_header_key'},
        {dataType: 'text', propertyName: 'journal_header_date'},
        {dataType: 'text', propertyName: 'journal_header_description'},
    ];

    if ($.fn.DataTable.isDataTable("#journalHeaderTable")) {
        $("#journalHeaderTable").DataTable().destroy();
    }

    fillDataIntoTable(journalHeaderTable, recentHundredJournalList, displayProperty, true, divModifyButton2)
    $("#journalHeaderTable").dataTable();


}


const handelResetJournalHeader = () => {
    window.location.reload();
}


const refreshJournalHeaderColorsToDefault = () => {
    selectCompany.style.border = "2px solid #ced4da";
    textDate.style.border = "2px solid #ced4da";
    textDescription.style.border = "2px solid #ced4da";
}


const getCompany = (ob) => {
    return ob.company_master_id.company_master_name;
}


const checkErrorsInJournalHeader = () => {
    let errors = ""

    if (journalHeader.company_master_id == null) {
        errors = errors + "Company cannot Be Empty \n"
    }

    if (journalHeader.journal_header_date == null) {
        errors = errors + "Date Cannot Be Empty \n"
    }
    return errors;
}

const refillJournalHeader = (ob) => {
    journalHeader = JSON.parse(JSON.stringify(ob));
    oldjournalHeader = JSON.parse(JSON.stringify(ob));

    fillDataIntoSelect(selectCompany, 'Select Company', companiesList, 'company_master_name',journalHeader.company_master_id.company_master_name)

    textDate.value=journalHeader.journal_header_date;
    textCode.value=journalHeader.journal_header_key;
    textDescription.value=journalHeader.journal_header_description;

    refreshJournalDetailsForm();
    refreshJournalDetailsTable();

    buttonJournalDetailsAdd.disabled=false;
    buttonJournalDetailsAdd.style.cursor="default";


}


const checkUpdatesJournalHeader = () => {

    let updates = ''

    if (journalHeader.company_master_id.company_master_name != oldjournalHeader.company_master_id.company_master_name) {
        updates = updates + "Company Is Updated \n"
    }

    if (journalHeader.journal_header_date != oldjournalHeader.journal_header_date) {
        updates = updates + "Date Is Updated \n"
    }

    if (journalHeader.journal_header_description != oldjournalHeader.journal_header_description) {
        updates = updates + "Description Is Updated \n"
    }
    return updates;
}


const saveOrUpdateJournalHeader = () => {

    if (textCode.value == "") {
        console.log(`save part`);
        let errors = checkErrorsInJournalHeader();
        if (errors == "") {
            const userConfirm = confirm(`Are You Sure To Add Following Journal header
            Company Name is ${journalHeader.company_master_id.company_master_name}
            Date Is ${journalHeader.journal_header_date}
            `);
            if (userConfirm) {
                const postServerResponse = ajaxPostRequest("/journal-header", journalHeader);
                if (postServerResponse) {
                    alert("Save Successful");
                    textCode.value = postServerResponse.journal_header_key;


                    journalHeader.id = postServerResponse.id;
                    journalHeader.journal_header_key = postServerResponse.journal_header_key;


                    refreshJournalHeaderColorsToDefault();
                    refreshJournalHeaderTable();


                    buttonJournalDetailsAdd.disabled=false;
                    buttonJournalDetailsAdd.style.cursor="default";


                }
            }
        } else {
            alert(`You Have Some Errors \n ${errors}`);
        }


    } else {
        console.log("update part");
        let errors = checkErrorsInJournalHeader();
        if (errors == "") {
            const userConfirm = confirm(`Are You Sure To Update Following 
            ID is ${journalHeader.id}
            Code Is ${journalHeader.journal_header_key}
            Company Name is ${journalHeader.company_master_id.company_master_name}
            Date Is ${journalHeader.journal_header_date}
            `);
            if (userConfirm) {
                const putServerResponse = ajaxPutRequest("/journal-header", journalHeader);
                if (putServerResponse == "ok") {
                    alert("Update Successful");
                    refreshJournalHeaderColorsToDefault();
                    refreshJournalHeaderTable();
                }
            }
        } else {
            alert(`You Have Some Errors \n ${errors}`)
        }


    }


}


const deleteJournalHeader = (ob) => {
    const userConfirm = confirm(`Are You Sure To Delete Journal
    Company Name is ${ob.company_master_id.company_master_name}
    Date Is ${ob.journal_header_date}
    `);
    if (userConfirm) {
        const deleteServerResponse = ajaxDeleteRequest("/journal-header", ob);
        if (deleteServerResponse == "ok") {
            alert("Delete Successful");
            divModifyButton2.classList.add("d-none");
            refreshJournalHeaderTable();
        } else {
            alert(`Delete Unsuccessful \n ${deleteServerResponse}`);
        }

    }
}
// need to implement delete journal details when deleting header..


// header section finished... from here we have details section

const refreshJournalDetailsForm = () => {

    journalDetails = new Object();


    selectLedgerAcc.style.border = "2px solid #ced4da";
    textJournalDetailsDebit.style.border = "2px solid #ced4da";
    textJournalDetailsCredit.style.border = "2px solid #ced4da";

    ledgerAccountList = ajaxGetRequest("/ledgerAccount/findAll")
    fillDataIntoSelect(selectLedgerAcc, "Select Ledger Account", ledgerAccountList, 'ledger_account_name')

    textJournalDetailsDebit.value = "";
    textJournalDetailsCredit.value = "";


    if (selectCompany.value=="Select Company"){
        let ledgerAccountsList = ajaxGetRequest("/ledgerAccount/findAll")
        fillDataIntoSelect(selectLedgerAcc,'Select Ledger Account',ledgerAccountsList,'ledger_account_name');
    }else {
        customizeLedgerAccounts(selectCompany);
    }


}


const refreshJournalDetailsTable = () => {

    divJournalDetails.classList.remove('d-none');


    const journalDetailsList = ajaxGetRequest(`/journal-details/getJournalDetailsFromHeaderKey/${textCode.value}`);

    const displayProperty = [
        {dataType: 'function', propertyName: getLedgerAccountName},
        {dataType: 'function', propertyName: getDebit},
        {dataType: 'function', propertyName: getCredit},
    ];

    if ($.fn.DataTable.isDataTable("#tableJournalDetails")) {
        $("#tableJournalDetails").DataTable().destroy();
    }

    fillDataIntoTable(tableJournalDetails, journalDetailsList, displayProperty, true, divModifyButton3)

    $("#tableJournalDetails").dataTable();


}


const getLedgerAccountName = (ob) => {
    return `<p>${ob.ledger_account_id.ledger_account_name}</p>`
}


const getDebit = (ob) => {
    return `<p class="text-end">${ob.journal_details_debit}</p>`
}


const getCredit = (ob) => {
    return `<p class="text-end">${ob.journal_details_credit}</p>`
}


const checkErrorsJournalDetails = () => {
    let errors = '';

    if (journalDetails.ledger_account_id == null) {
        errors = errors + "Account Cannot Be empty \n";
    }

    if (journalDetails.journal_details_header_key==null){
        errors=errors+"header cannot be empty \n "
    }

    return errors
}


const saveJournalDetails = () => {

    journalDetails.journal_details_header_key = textCode.value;

    let errors = checkErrorsJournalDetails();

    if (errors == "") {
        const userConfirm = confirm(`are You Sure To Add Following Journal Details 
        Account Name Is ${journalDetails.ledger_account_id.ledger_account_name}
        Header Code Is ${journalHeader.journal_details_header_key}
        Credit IS ${journalDetails.journal_details_credit == null ? "Not Entered" : journalDetails.journal_details_credit}
        Debit  IS ${journalDetails.journal_details_debit == null ? "Not Entered" : journalDetails.journal_details_debit}
        `);
        if (userConfirm) {
            const postServerResponse = ajaxPostRequest("/journal-details", journalDetails);
            if (postServerResponse == "ok") {
                alert(`Save Successful`);
                refreshJournalDetailsForm();
                refreshJournalDetailsTable();
            } else {
                alert(`Save Unsuccessful \n ${postServerResponse}`);
            }
        }
    } else {
        alert(`You Have Some Errors \n ${errors}`);
    }
}


const refillJournalDetails = (ob) => {
    journalDetails = JSON.parse(JSON.stringify(ob));
    oldjournalDetails = JSON.parse(JSON.stringify(ob));


    fillDataIntoSelect(selectLedgerAcc, "Select Ledger Account", ledgerAccountList, 'ledger_account_name', journalDetails.ledger_account_id.ledger_account_name);

    textJournalDetailsDebit.value = journalDetails.journal_details_debit
    textJournalDetailsCredit.value = journalDetails.journal_details_credit

    buttonJournalDetailsUpdate.disabled=false;
    buttonJournalDetailsUpdate.style.cursor="default";


    buttonJournalDetailsAdd.disabled=true;
    buttonJournalDetailsAdd.style.cursor="not-allowed";

}

const checkUpdatesJournalDetails = () => {
    let updates = '';

    if (journalDetails.ledger_account_id.ledger_account_name != oldjournalDetails.ledger_account_id.ledger_account_name) {
        updates = updates + "Ledger Account Is Updated \n"
    }

    if (journalDetails.journal_details_debit != oldjournalDetails.journal_details_debit) {
        updates = updates + "Debit Amount Is Updated \n";
    }

    if (journalDetails.journal_details_debit != oldjournalDetails.journal_details_debit) {
        updates = updates + "Debit Amount Is Updated \n";
    }


    return updates;
}


const updateJournalDetails = () => {
    let updates = checkUpdatesJournalDetails();
    if (updates != "") {
        const userConfirm = confirm(`Are You Sure To Update Following \n ${updates}`);
        if (userConfirm) {
            const putServerResponse = ajaxPutRequest("/journal-details", journalDetails);
            if (putServerResponse == "ok") {
                alert(`Update Successful`)
                refreshJournalDetailsForm();
                refreshJournalDetailsTable();

                buttonJournalDetailsUpdate.disabled=true;
                buttonJournalDetailsUpdate.style.cursor="not-allowed";


                buttonJournalDetailsAdd.disabled=false;
                buttonJournalDetailsAdd.style.cursor="default";


                divModifyButton3.classList.add("d-none");
            } else {
                alert(`update Unsuccessful \n ${putServerResponse}`);
            }
        }
    } else {
        alert(`nothing to update`)
    }
}


const deleteJournalDetails = (ob) => {
    const userConfirm = confirm(`Are you sure to delete following journal details 
        Account Name Is ${ob.ledger_account_id.ledger_account_name}
        Credit IS ${ob.journal_details_credit == null ? "Not Entered" : ob.journal_details_credit}
        Debit  IS ${ob.journal_details_debit == null ? "Not Entered" : ob.journal_details_debit}
    `);
    if (userConfirm) {
        const deleteServerResponse = ajaxDeleteRequest("/journal-details", ob);
        if (deleteServerResponse == "ok") {
            alert("delete successful");
            refreshJournalDetailsForm();
            refreshJournalDetailsTable();
            divModifyButton3.classList.add("d-none");
        } else {
            alert(`delete unsuccessful \n ${deleteServerResponse}`);
        }
    }
}




















