package com.packleaf.bookkeeping.dao;

import com.packleaf.bookkeeping.entity.FromAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FromAccountDao extends JpaRepository<FromAccount,Integer> {


    @Query(value = "select acc from FromAccount acc where acc.company_master_id.id=?1")
    public List<FromAccount> getFromAccountById(Integer id);




}
