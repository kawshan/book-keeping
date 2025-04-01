package com.packleaf.bookkeeping.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "petty_cash_header")
@AllArgsConstructor
@NoArgsConstructor

public class PettyCashHeader {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "petty_cash_header_date")
    private LocalDate petty_cash_header_date;

    @Column(name = "petty_cash_header_balance")
    private BigDecimal petty_cash_header_balance;

    @Column(name = "petty_cash_header_code")
    private String petty_cash_header_code;

    @Column(name = "petty_cash_header_number")
    private String petty_cash_header_number;

    @ManyToOne
    @JoinColumn(name = "company_master_id",referencedColumnName = "id")
    private CompanyMaster company_master_id;

    @ManyToOne
    @JoinColumn(name = "from_account_id",referencedColumnName = "id")
    private FromAccount from_account_id;



}
