package com.packleaf.bookkeeping.dao;

import com.packleaf.bookkeeping.entity.LedgerAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LedgerAccountDao extends JpaRepository<LedgerAccount,Integer> {


    @Query(value = "select lac from LedgerAccount lac where lac.company_master_id.id=?1")
    public List<LedgerAccount> findLedgerAccountByCompanyMasterId(Integer id);




}
