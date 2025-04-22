package com.packleaf.bookkeeping.controller;

import com.packleaf.bookkeeping.dao.JournalDetailsDao;
import com.packleaf.bookkeeping.entity.JournalDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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




    @PostMapping
    public String saveJournalDetails(@RequestBody JournalDetails journalDetails) {
        try {
            journalDetailsDao.save(journalDetails);
            return "ok";
        }catch (Exception e) {
            return "save journal details failed"+e.getMessage();
        }
    }


    @PutMapping
    public String updateJournalDetails(@RequestBody JournalDetails journalDetails) {
        try {
            journalDetailsDao.save(journalDetails);
            return "ok";
        }catch (Exception e) {
            return "update journal details failed"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deleteJournalDetails(@RequestBody JournalDetails journalDetails) {
        try {
            journalDetailsDao.delete(journalDetails);
            return "ok";
        } catch (Exception e){
            return "delete journal details failed"+e.getMessage();
        }
    }





    @GetMapping(value = "/getJournalDetailsFromHeaderKey/{headerKey}")
    public List<JournalDetails> getJournalDetailsFromHeaderKey(@PathVariable("headerKey") String headerKey) {
        return journalDetailsDao.getAllJournalDetailsByHeaderKey(headerKey);
    }


    @GetMapping(value = "/getCredit/{headerKey}")
    public String getCredit(@PathVariable("headerKey") String headerKey){
       return journalDetailsDao.getCreditFromHeaderKey(headerKey);
    }


    @GetMapping(value = "/getDebit/{headerKey}")
    public String getDebit(@PathVariable("headerKey") String headerKey){
        return journalDetailsDao.getDebitFromHeaderKey(headerKey);
    }






}
