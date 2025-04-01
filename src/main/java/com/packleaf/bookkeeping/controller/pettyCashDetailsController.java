package com.packleaf.bookkeeping.controller;

import com.packleaf.bookkeeping.dao.PettyCashDetailsDao;
import com.packleaf.bookkeeping.entity.PettyCashDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/pettyCashDetails")
public class pettyCashDetailsController {

    @Autowired
    private PettyCashDetailsDao pettyCashDetailsDao;

    @GetMapping(value = "/findAll")
    public List<PettyCashDetails> findAllPettyCashDetails() {
        return pettyCashDetailsDao.findAll();
    }

    @GetMapping(value = "/getFromHeaderCode/{code}")
    public List<PettyCashDetails> getFromHeaderCode(@PathVariable("code") String code) {
       return pettyCashDetailsDao.getPettyCashDetailsByHeaderCode(code);
    }


    @GetMapping(value = "/getFromHeaderKey/{code}")
    public List<PettyCashDetails> getAllPettyCashFromHeaderKey(@PathVariable("code")String code){
        return pettyCashDetailsDao.getPettyCashDetailsFromHeaderCode(code);
    }


    @PostMapping
    public String savePettyCashDetails(@RequestBody PettyCashDetails pettyCashDetails) {
        try {

            String nextPettyCashVoucher = pettyCashDetailsDao.geNextVoucherNumber();
            if (nextPettyCashVoucher==null || nextPettyCashVoucher.equals("")) {
                pettyCashDetails.setPetty_cash_details_voucher_number("V0001");
            }else {
                pettyCashDetails.setPetty_cash_details_voucher_number(nextPettyCashVoucher);
            }

            pettyCashDetailsDao.save(pettyCashDetails);
            return "ok";
        }catch (Exception e){
            return "petty cash save failed"+e.getMessage();
        }
    }


    @PutMapping
    public String updatePettyCashDetails(@RequestBody PettyCashDetails pettyCashDetails){
        try {
            pettyCashDetailsDao.save(pettyCashDetails);
            return "ok";
        }catch (Exception e){
            return "petty cash update failed"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deletePettyCashDetails(@RequestBody PettyCashDetails pettyCashDetails){
        try {
            pettyCashDetailsDao.delete(pettyCashDetails);
            return "ok";
        }catch (Exception e){
            return "petty cash delete failed"+e.getMessage();
        }
    }






}
