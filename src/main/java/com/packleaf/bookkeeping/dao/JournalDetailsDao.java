package com.packleaf.bookkeeping.dao;

import com.packleaf.bookkeeping.entity.JournalDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JournalDetailsDao extends JpaRepository<JournalDetails,Integer> {


    @Query(value = "select jd from JournalDetails jd where jd.journal_details_header_key=?1")
    public List<JournalDetails> getAllJournalDetailsByHeaderKey(String headerKey);



}
