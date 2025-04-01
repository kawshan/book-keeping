package com.packleaf.bookkeeping.dao;

import com.packleaf.bookkeeping.entity.PettyCashHeader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PettyCashHeaderDao extends JpaRepository<PettyCashHeader,Integer> {



    @Query(value = "select pch from PettyCashHeader pch order by pch.id desc limit 100")
    public List<PettyCashHeader> getRecentPettyCashHeaders();


    @Query(value = "select concat('PC',lpad(max(substring(petty_cash_header_code,3))+1,4,'0')) from petty_cash_header as max_petty_cash_header_code;",nativeQuery = true)
    public String getMaxPettyCashHeaderCode();



    @Query(value = "select max(petty_cash_header_number+1) from petty_cash_header as next_petty_cash_header_number;",nativeQuery = true)
    public String getMaxPettyCashHeaderNumber();






}
