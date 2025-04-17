package com.packleaf.bookkeeping.dao;

import com.packleaf.bookkeeping.entity.JournalHeader;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JournalHeaderDao extends JpaRepository<JournalHeader,Integer> {
}
