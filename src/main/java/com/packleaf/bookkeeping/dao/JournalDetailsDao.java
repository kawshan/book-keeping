package com.packleaf.bookkeeping.dao;

import com.packleaf.bookkeeping.entity.JournalDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JournalDetailsDao extends JpaRepository<JournalDetails,Integer> {
}
