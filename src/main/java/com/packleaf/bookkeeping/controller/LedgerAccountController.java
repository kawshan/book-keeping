package com.packleaf.bookkeeping.controller;

import com.packleaf.bookkeeping.dao.LedgerAccountDao;
import com.packleaf.bookkeeping.entity.LedgerAccount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/ledgerAccount")
public class LedgerAccountController {

    @Autowired
    private LedgerAccountDao ledgerAccountDao;


    @GetMapping(value = "/findAll")
    public List<LedgerAccount> findAllLedgerAccounts(){
        return ledgerAccountDao.findAll();
    }


    @GetMapping(value = "/getByCompanyId/{id}")
    public List<LedgerAccount> getLedgerAccountByCompany(@PathVariable("id")Integer id){
        return ledgerAccountDao.findLedgerAccountByCompanyMasterId(id);
    }





}
