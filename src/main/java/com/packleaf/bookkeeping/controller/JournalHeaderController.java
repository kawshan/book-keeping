package com.packleaf.bookkeeping.controller;

import com.packleaf.bookkeeping.dao.JournalHeaderDao;
import com.packleaf.bookkeeping.entity.JournalHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/journal-header")
public class JournalHeaderController {

    @Autowired
    private JournalHeaderDao journalHeaderDao;


    @GetMapping(value = "/findall")
    public List<JournalHeader> findAllJournalHeaders(){
        return journalHeaderDao.findAll();
    }







}
