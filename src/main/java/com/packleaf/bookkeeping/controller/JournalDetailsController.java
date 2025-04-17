package com.packleaf.bookkeeping.controller;

import com.packleaf.bookkeeping.dao.JournalDetailsDao;
import com.packleaf.bookkeeping.entity.JournalDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/journal-details")
public class JournalDetailsController {

    @Autowired
    private JournalDetailsDao journalDetailsDao;

    @GetMapping(value = "/findall")
    public List<JournalDetails> findAllJournalDetails() {
        return journalDetailsDao.findAll();
    }













}
