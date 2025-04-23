package com.packleaf.bookkeeping.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@Table
@AllArgsConstructor
@NoArgsConstructor
public class JournalDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "journal_details_debit")
    private BigDecimal journal_details_debit;

    @Column(name = "journal_details_credit")
    private BigDecimal journal_details_credit;

    @Column(name = "journal_details_header_key")
    private String journal_details_header_key;

    @Column(name = "journal_details_description")
    private String journal_details_description;

    @ManyToOne
    @JoinColumn(name = "ledger_account_id",referencedColumnName = "id")
    private LedgerAccount ledger_account_id;





}
