package com.packleaf.bookkeeping.controller;

import com.packleaf.bookkeeping.dao.CompanyMasterDao;
import com.packleaf.bookkeeping.entity.CompanyMaster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/companyMaster")
public class CompanyMasterController {

    @Autowired
    private CompanyMasterDao companyMasterDao;


    @GetMapping(value = "/findAll")
    public List<CompanyMaster> getAllCompanyMasters() {
        return  companyMasterDao.findAll();
    }



}
