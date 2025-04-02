window.addEventListener('load', function () {

    refreshPettyCashHeaderForm();
    refreshPettyCashHeaderTable();


    refreshPettyCashDetailsForm();


})

const refreshPettyCashHeaderForm = () => {

    pettyCashHeader = new Object();

    selectCompany.style.border = '2px solid #ced4da';
    textDate.style.border = '2px solid #ced4da';
    textNumber.style.border = '2px solid #ced4da';
    textCode.style.border = '2px solid #ced4da';
    selectFromAcc.style.border = '2px solid #ced4da';
    textBalance.style.border = '2px solid #ced4da';


    textDate.value = "";
    textNumber.value = "";
    textCode.value = "";
    textBalance.value = "";

    companiesList = ajaxGetRequest("/companyMaster/findAll")
    fillDataIntoSelect(selectCompany, 'Select Company', companiesList, 'company_master_name');

    fromAccountList = ajaxGetRequest("/fromAccount/findAll")
    fillDataIntoSelect(selectFromAcc, 'Select Account', fromAccountList, 'account_name');


    buttonPettyCashDetailsUpdate.disabled=true;
    buttonPettyCashDetailsUpdate.style.cursor="not-allowed";


    buttonPettyCashDetailsAdd.disabled=true;
    buttonPettyCashDetailsAdd.style.cursor="not-allowed";

}


const refreshColoursToDefault = () => {
    selectCompany.style.border = '2px solid #ced4da';
    textDate.style.border = '2px solid #ced4da';
    textNumber.style.border = '2px solid #ced4da';
    textCode.style.border = '2px solid #ced4da';
    selectFromAcc.style.border = '2px solid #ced4da';
    textBalance.style.border = '2px solid #ced4da';
}


const refreshPettyCashHeaderTable = () => {

    pettyCashHeadersList = ajaxGetRequest("/pettyCashHeader/getRecentHundredRecords");

    const displayProperty = [
        {dataType: 'text', propertyName: 'petty_cash_header_date'},
        {dataType: 'function', propertyName: getCompany},
        {dataType: 'function', propertyName: getPettyCashHeaderNumber},
        {dataType: 'function', propertyName: getFromAccount},
    ];

    if ($.fn.DataTable.isDataTable("#pettyCashHeaderTable")){
        $("#pettyCashHeaderTable").dataTable().destroy();
    }

    fillDataIntoTable(pettyCashHeaderTable, pettyCashHeadersList, displayProperty, true, divModifyButton2)
    $("#pettyCashHeaderTable").dataTable()


}

const getCompany = (ob) => {
    return ob.company_master_id.company_master_name;
}

const getPettyCashHeaderNumber = (ob) => {
    return `<p class="text-end">${ob.petty_cash_header_number}</p>`
}

const getFromAccount = (ob) => {
    return `<p>${ob.from_account_id.account_name}</p>`
}


const checkErrorsPettyCashHeader = () => {

    let errors = ''

    if (pettyCashHeader.petty_cash_header_date == null) {
        errors = errors + `Date Cannot Be Empty \n`;
    }

    if (pettyCashHeader.company_master_id == null) {
        errors = errors + "Company Cannot Be Empty \n"
    }

    if (pettyCashHeader.from_account_id == null) {
        errors = errors + "From Account Cannot Be Empty \n"
    }


    return errors;
}


const saveOrUpdatePettyCashHeader = () => {

    if (textCode.value == "") {
        //     add part
        console.log(`add part`);
        const errors = checkErrorsPettyCashHeader();
        if (errors == "") {
            const userConfirm = confirm(`Are You Sure To Delete Following Petty Cash Header
            Date Is ${pettyCashHeader.petty_cash_header_date}
            Company Is ${pettyCashHeader.company_master_id.company_master_name}
            From Account Is ${pettyCashHeader.from_account_id.account_name}
            `);
            if (userConfirm) {
                const postServerResponse = ajaxPostRequest("/pettyCashHeader", pettyCashHeader);
                if (postServerResponse) {
                    alert(`Save Successful`);
                    refreshPettyCashHeaderTable();
                    refreshColoursToDefault();


                    buttonPettyCashDetailsAdd.disabled=false;
                    buttonPettyCashDetailsAdd.style.cursor="default";



                    textNumber.value = Number(postServerResponse.petty_cash_header_number);
                    textCode.value = postServerResponse.petty_cash_header_code
                    console.log(`saved id is ${postServerResponse.id}`);
                    console.log(`number is ${Number(postServerResponse.petty_cash_header_number)}`)

                    //binding response values to the object
                    pettyCashHeader.petty_cash_header_code = textCode.value
                    pettyCashHeader.id = postServerResponse.id;
                    pettyCashHeader.petty_cash_header_number = textNumber.value
                } else {
                    alert(`Save Unsuccessful`);

                }
            }
        } else {
            alert(`you have some errors \n ${errors}`)

        }

    } else {
        //     update part
        console.log(`update part`);
        const errors = checkErrorsPettyCashHeader();
        if (errors == "") {
            const userConfirm = confirm(`Are You Sure To Update Following 
            Date Is ${pettyCashHeader.petty_cash_header_date}
            Company Is ${pettyCashHeader.company_master_id.company_master_name}
            From Account Is ${pettyCashHeader.from_account_id.account_name}
            `);
            if (userConfirm) {
                const putServerResponse = ajaxPutRequest("/pettyCashHeader", pettyCashHeader);
                if (putServerResponse == "ok") {
                    alert(`Update Successful`);
                    refreshColoursToDefault();
                    refreshPettyCashHeaderTable();
                } else {
                    alert(`Update Unsuccessful \n ${putServerResponse}`);
                }
            }
        } else {
            alert(`You Have Some Errors ${errors}`);
        }
    }


}

const deletePettyCashHeader = (ob) => {
    const userConfirm = confirm(`Are You Sure To Delete Following Petty Cash header 
            Date Is ${ob.petty_cash_header_date}
            Company Is ${ob.company_master_id.company_master_name}
            From Account Is ${ob.from_account_id.account_name}
    `);
    if (userConfirm) {
        const deleteServerResponse = ajaxDeleteRequest("/pettyCashHeader", ob);
        if (deleteServerResponse == "ok") {
            alert("delete successful")
            refreshPettyCashHeaderTable();
            divModifyButton2.classList.add('d-none');
        } else {
            alert(`delete unsuccessful \n ${deleteServerResponse}`);
        }
    }
}


const customizeFromAccount = (fieldId) => {

    selectedValue = JSON.parse(fieldId.value);
    console.log(`id is  ${selectedValue.id}`);

    const fromAccountServerResponse = ajaxGetRequest(`/fromAccount/getFromCompanyId/${selectedValue.id}`);
    fillDataIntoSelect(selectFromAcc, 'Select Account', fromAccountServerResponse, 'account_name');


}


const customizeLedgerAccounts = (fieldId)=>{
    selectedValue = JSON.parse(fieldId.value);

    const fromAccountServerResponse = ajaxGetRequest(`/ledgerAccount/getByCompanyId/${selectedValue.id}`);
    fillDataIntoSelect(selectLedgerAcc,'Select Ledger Account',fromAccountServerResponse,'ledger_account_name');


}


const refillPettyCashHeader = async (ob)=>{

    pettyCashHeader = JSON.parse(JSON.stringify(ob));
    oldpettyCashHeader = JSON.parse(JSON.stringify(ob));


    textDate.value= pettyCashHeader.petty_cash_header_date;
    textNumber.value= pettyCashHeader.petty_cash_header_number;
    textCode.value= pettyCashHeader.petty_cash_header_code;

    await fillDataIntoSelect(selectCompany, 'Select Company', companiesList, 'company_master_name',pettyCashHeader.company_master_id.company_master_name);

    const selectedValue = JSON.parse(selectCompany.value);
    const fromAccountServerResponse = ajaxGetRequest(`/fromAccount/getFromCompanyId/${selectedValue.id}`);
    fillDataIntoSelect(selectFromAcc, 'Select Account', fromAccountServerResponse, 'account_name',pettyCashHeader.from_account_id.account_name);

    refreshPettyCashDetailsTable();

    refreshPettyCashDetailsForm();


    buttonPettyCashDetailsAdd.disabled=false;
    buttonPettyCashDetailsAdd.style.cursor="default";
}


const handelResetPettyCashHeader = ()=>{
    window.location.reload();
}


const loadFullPettyCashHeaderTable = ()=>{

    divPettyCashHeader.classList.add('d-none');
    divPettyCashFullHeader.classList.remove('d-none')

    const fullHeadersList = ajaxGetRequest("/pettyCashHeader/findAll");

    const displayProperty = [
        {dataType: 'text', propertyName: 'petty_cash_header_date'},
        {dataType: 'function', propertyName: getCompany},
        {dataType: 'function', propertyName: getPettyCashHeaderNumber},
        {dataType: 'function', propertyName: getFromAccount},
    ];

    if ($.fn.DataTable.isDataTable("#tableFullPettyCashHeader")){
        $("#tableFullPettyCashHeader").DataTable.destroy();
    }

    fillDataIntoTable(tableFullPettyCashHeader, fullHeadersList, displayProperty, true, divModifyButton2)
    $("#tableFullPettyCashHeader").DataTable();


}









// header section is finished from here we are going to start details section



const refreshPettyCashDetailsForm = ()=>{

    pettyCashDetails = new Object();

    selectLedgerAcc.style.border='2px solid #ced4da';
    textPettyCashDetailsDescription.style.border='2px solid #ced4da';
    textPettyCashDetailsReferenceNum.style.border='2px solid #ced4da';
    textPettyCashDetailsAmount.style.border='2px solid #ced4da';


    textPettyCashDetailsDescription.value="";
    textPettyCashDetailsReferenceNum.value="";
    textPettyCashDetailsAmount.value="";


    if (selectCompany.value=="Select Company"){
        let ledgerAccountsList = ajaxGetRequest("/ledgerAccount/findAll")
        fillDataIntoSelect(selectLedgerAcc,'Select Ledger Account',ledgerAccountsList,'ledger_account_name');
    }else {
        customizeLedgerAccounts(selectCompany);
    }
}

const refreshPettyCashDetailsTable = ()=>{

    divPettyCashDetails.classList.remove('d-none');

    const refreshPettyCashDetailsList = ajaxGetRequest(`/pettyCashDetails/getFromHeaderCode/${textCode.value}`);


    const displayProperty = [
        {dataType:'function',propertyName:getLedgerAccountName},
        {dataType:'text',propertyName:'petty_cash_description'},
        {dataType:'text',propertyName:'petty_cash_details_reference_number'},
        {dataType:'function',propertyName:getAmount},
    ];

    fillDataIntoTable(tablePettyCashDetails,refreshPettyCashDetailsList,displayProperty,true,divModifyButton3)

}

const getLedgerAccountName=(ob)=>{
    return `<p>${ob.ledger_account_id.ledger_account_name}</p>`
}

const getAmount = (ob)=>{
    return `<p class="text-end">${Number(ob.petty_cash_details_amount).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`
}


const checkErrorsPettyCashDetails = ()=>{
    let errors = '';

    if (pettyCashDetails.ledger_account_id == null){
        errors=errors+"Ledger Account Cannot Be Empty \n"
    }

    if (pettyCashDetails.petty_cash_details_amount == null){
        errors=errors+"Amount Cannot Be Empty \n"
    }
    return errors;
}


const addPettyCashDetails = ()=>{
    pettyCashDetails.petty_cash_details_header_code = textCode.value;
    const errors = checkErrorsPettyCashDetails();
    if (errors==""){
        const userConfirm = confirm(`Are You Sure to add following details
        ledger account is ${pettyCashDetails.ledger_account_id.ledger_account_name}
        Amount is ${pettyCashDetails.petty_cash_details_amount}
        Header Is ${pettyCashDetails.petty_cash_details_header_code}
        `);
        if (userConfirm){
            const postServerResponse = ajaxPostRequest("/pettyCashDetails",pettyCashDetails);
            if (postServerResponse=="ok"){
                alert(`Save Successful`);
                refreshPettyCashDetailsForm();
                refreshPettyCashDetailsTable();
            }else {
                alert(`Save Unsuccessful`)
            }
        }
    }else {
        alert(`You Have Some Errors ${errors}`);
    }
}


const refillPettyCashDetails = (ob)=>{

    pettyCashDetails = JSON.parse(JSON.stringify(ob));
    oldpettyCashDetails = JSON.parse(JSON.stringify(ob));

    textPettyCashDetailsDescription.value=pettyCashDetails.petty_cash_description
    textPettyCashDetailsReferenceNum.value=pettyCashDetails.petty_cash_details_reference_number
    textPettyCashDetailsAmount.value=pettyCashDetails.petty_cash_details_amount


    const fromAccountServerResponse = ajaxGetRequest(`/ledgerAccount/getByCompanyId/${selectedValue.id}`);
    fillDataIntoSelect(selectLedgerAcc,'Select Ledger Account',fromAccountServerResponse,'ledger_account_name',pettyCashDetails.ledger_account_id.ledger_account_name);

    buttonPettyCashDetailsUpdate.disabled=false;
    buttonPettyCashDetailsUpdate.style.cursor="default";


    buttonPettyCashDetailsAdd.disabled=true;
    buttonPettyCashDetailsAdd.style.cursor="not-allowed";



}


const checkUpdatesPettyCashDetails = ()=>{
    let updates = "";

    if (pettyCashDetails.ledger_account_id.ledger_account_name != oldpettyCashDetails.ledger_account_id.ledger_account_name){
        updates=updates+"Ledger Account Is Updated \n"
    }

    if (pettyCashDetails.petty_cash_description != oldpettyCashDetails.petty_cash_description){
        updates=updates+"Description Is Updated \n"
    }

    if (pettyCashDetails.petty_cash_details_reference_number != oldpettyCashDetails.petty_cash_details_reference_number){
        updates=updates+"Reference Is Updated \n"
    }
    if (pettyCashDetails.petty_cash_details_amount != oldpettyCashDetails.petty_cash_details_amount){
        updates=updates+"Amount Is Updated \n"
    }
    return updates;
}



const updatePettyCashDetails = ()=>{

    const errors = checkErrorsPettyCashDetails();
    if (errors==""){
        const updates = checkUpdatesPettyCashDetails();
        if (updates!=""){
            const userConfirm = confirm(`Are You Sure To Do Following Changes \n  ${updates}`)
            if (userConfirm){
                const putServerResponse = ajaxPutRequest("/pettyCashDetails",pettyCashDetails);
                if (putServerResponse=="ok"){
                    alert(`update Successful`);
                    refreshPettyCashDetailsForm();
                    refreshPettyCashDetailsTable();
                    divModifyButton3.classList.add('d-none');


                    buttonPettyCashDetailsUpdate.disabled=true;
                    buttonPettyCashDetailsUpdate.style.cursor="not-allowed";


                    buttonPettyCashDetailsAdd.disabled=false;
                    buttonPettyCashDetailsAdd.style.cursor="default";

                }
            }
        }else {
            alert(`nothing to update`)
        }


    }else {
        alert(`You Have Some Errors ${errors}`);
    }

}



const deletePettyCashDetails = (ob)=>{
    const userConfirm =confirm(`Are You Sure To Delete Following Petty Cash Details 
        ledger account is ${ob.ledger_account_id.ledger_account_name}
        Amount is ${ob.petty_cash_details_amount}
        Header Is ${ob.petty_cash_details_header_code}
    `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/pettyCashDetails",ob);
        if (deleteServerResponse=="ok"){
            alert(`delete successful`)
            refreshPettyCashDetailsForm();
            refreshPettyCashDetailsTable();
            divModifyButton3.classList.add('d-none');
        }else {
            alert(`delete unsuccessful \n ${deleteServerResponse}`)
        }
    }




}




































