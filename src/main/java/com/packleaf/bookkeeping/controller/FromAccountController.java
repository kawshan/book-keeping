package com.packleaf.bookkeeping.controller;


import com.packleaf.bookkeeping.dao.FromAccountDao;
import com.packleaf.bookkeeping.entity.FromAccount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/fromAccount")
public class FromAccountController {

    @Autowired
    private FromAccountDao fromAccountDao;

    @GetMapping(value = "/findAll")
    public List<FromAccount> getAllFromAccount() {
        return fromAccountDao.findAll();
    }


    @GetMapping(value = "/getFromCompanyId/{id}")
    public List<FromAccount> getFromAccountByCompanyId(@PathVariable("id") Integer id){
        return fromAccountDao.getFromAccountById(id);
    }








}
