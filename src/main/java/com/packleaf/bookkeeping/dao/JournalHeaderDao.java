package com.packleaf.bookkeeping.dao;

import com.packleaf.bookkeeping.entity.JournalHeader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JournalHeaderDao extends JpaRepository<JournalHeader,Integer> {


    @Query(value = "select jh from JournalHeader jh order by jh.id desc limit 100")
    public List<JournalHeader> getRecentJournalHeaders();


    @Query(value = "select concat('GJ',lpad(max(substring(journal_header_key,3))+1,4,'0')) from journal_header as max_journal_header;",nativeQuery = true)
    public String getNextJournalHeaderKey();




}
