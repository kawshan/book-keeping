package com.packleaf.bookkeeping.dao;

import com.packleaf.bookkeeping.entity.PettyCashDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PettyCashDetailsDao extends JpaRepository<PettyCashDetails,Integer> {


    @Query(value = "select pcd from PettyCashDetails pcd where pcd.petty_cash_details_header_code=?1")
    public List<PettyCashDetails> getPettyCashDetailsByHeaderCode(String headerCode);


    @Query(value = "select pcd from PettyCashDetails pcd where pcd.petty_cash_details_header_code=?1")
    public List<PettyCashDetails> getPettyCashDetailsFromHeaderCode(String headerCode);


    @Query(value = "select concat('V',lpad(max(substring(petty_cash_details_voucher_number,2))+1,4,'0')) from petty_cash_details as max_voucher;",nativeQuery = true)
    public String geNextVoucherNumber();




}
