package com.packleaf.bookkeeping.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "ledger_account")
@AllArgsConstructor
@NoArgsConstructor
public class LedgerAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "ledger_account_name")
    private String ledger_account_name;

    @ManyToOne
    @JoinColumn(name = "company_master_id", referencedColumnName = "id")
    private CompanyMaster company_master_id;




}
