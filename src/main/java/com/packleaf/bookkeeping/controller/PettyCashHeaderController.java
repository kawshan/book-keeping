package com.packleaf.bookkeeping.controller;

import com.packleaf.bookkeeping.dao.PettyCashHeaderDao;
import com.packleaf.bookkeeping.entity.PettyCashDetails;
import com.packleaf.bookkeeping.entity.PettyCashHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/pettyCashHeader")
public class PettyCashHeaderController {

    @Autowired
    private PettyCashHeaderDao pettyCashHeaderDao;

    @GetMapping(value = "/findAll")
    public List<PettyCashHeader> getAllPettyCashHeader() {
        return pettyCashHeaderDao.findAll();
    }


    @GetMapping(value = "/getRecentHundredRecords")
    public List<PettyCashHeader> getRecentHundredRecords() {
        return pettyCashHeaderDao.getRecentPettyCashHeaders();
    }



    @GetMapping
    public ModelAndView pettyCashHeaderView(){
        ModelAndView PettyCashUI = new ModelAndView();
        PettyCashUI.setViewName("pettycashheader.html");
        return PettyCashUI;
    }


    @PostMapping
    public ResponseEntity<Object> addPettyCashHeader(@RequestBody PettyCashHeader pettyCashHeader) {
        try {

            String maxPettyCashHeaderCode = pettyCashHeaderDao.getMaxPettyCashHeaderCode();
            if (maxPettyCashHeaderCode == null || maxPettyCashHeaderCode.equals("")) {
                pettyCashHeader.setPetty_cash_header_code("PC0001");
            }else {
                pettyCashHeader.setPetty_cash_header_code(maxPettyCashHeaderCode);
            }

            String getNextPettyCashNumber= pettyCashHeaderDao.getMaxPettyCashHeaderNumber();
            if (getNextPettyCashNumber==null || getNextPettyCashNumber.equals("")) {
                pettyCashHeader.setPetty_cash_header_number("1001");
            }else {
                pettyCashHeader.setPetty_cash_header_number(getNextPettyCashNumber);
            }

            PettyCashHeader savedPettyCashHeader = pettyCashHeaderDao.save(pettyCashHeader);
            return ResponseEntity.ok(savedPettyCashHeader);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



    @PutMapping
    public String updatePettyCashHeader(@RequestBody PettyCashHeader pettyCashHeader){
        try {
            pettyCashHeaderDao.save(pettyCashHeader);
            return "ok";
        }catch (Exception e) {
            return "update not complete"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deleteMapping(@RequestBody PettyCashHeader pettyCashHeader){
        try {
            // also need to handel delete petty cash details
            pettyCashHeaderDao.delete(pettyCashHeader);
            return "ok";
        }catch (Exception e){
            return "delete not complete"+e.getMessage();
        }
    }









}
