package com.packleaf.bookkeeping.controller;

import com.packleaf.bookkeeping.dao.JournalHeaderDao;
import com.packleaf.bookkeeping.entity.JournalHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/journal-header")
public class JournalHeaderController {

    @Autowired
    private JournalHeaderDao journalHeaderDao;


    @GetMapping(value = "/findall")
    public List<JournalHeader> findAllJournalHeaders(){
        return journalHeaderDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }


    @GetMapping
    public ModelAndView JournalHeaderView (){
        ModelAndView journalUi = new ModelAndView();
        journalUi.setViewName("journalheader.html");
        return journalUi;
    }


    @GetMapping(value = "/getRecentHundredJournalHeaders")
    public List<JournalHeader> getRecentHundredJournalHeaders(){
        return journalHeaderDao.getRecentJournalHeaders();
    }


    @PostMapping
    public ResponseEntity<Object> createJournalHeader(@RequestBody JournalHeader journalHeader){
        try {
            String nextHeaderKey = journalHeaderDao.getNextJournalHeaderKey();
            if (nextHeaderKey==null || nextHeaderKey.equals("")){
                journalHeader.setJournal_header_key("GJ0001");
            }else {
                journalHeader.setJournal_header_key(nextHeaderKey);
            }

           JournalHeader savedJournalHeader =  journalHeaderDao.save(journalHeader);
//            return ResponseEntity.status(HttpStatus.CREATED).body(savedJournalHeader);
            return ResponseEntity.ok(savedJournalHeader);

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



    @PutMapping
    public String updateJournalHeader(@RequestBody JournalHeader journalHeader){
        try {
            journalHeaderDao.save(journalHeader);
            return "ok";
        }catch (Exception e){
            return "Update Journal Header Failed"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deleteJournalHeader(@RequestBody JournalHeader journalHeader){
        try {
            journalHeaderDao.delete(journalHeader);
            return "ok";
        }catch (Exception e){
            return "Delete Journal Header Failed"+e.getMessage();
        }
    }







}
