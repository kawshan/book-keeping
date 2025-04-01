package com.packleaf.bookkeeping.dao;

import com.packleaf.bookkeeping.entity.CompanyMaster;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyMasterDao extends JpaRepository<CompanyMaster,Integer> {
}
