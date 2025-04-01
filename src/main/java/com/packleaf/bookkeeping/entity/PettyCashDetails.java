package com.packleaf.bookkeeping.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@Table(name = "petty_cash_details")
@AllArgsConstructor
@NoArgsConstructor
public class PettyCashDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "petty_cash_description")
    private String petty_cash_description;

    @Column(name = "petty_cash_details_reference_number")
    private String petty_cash_details_reference_number;

    @Column(name = "petty_cash_details_amount")
    private BigDecimal petty_cash_details_amount;

    @Column(name = "petty_cash_details_header_code")
    private String petty_cash_details_header_code;

    @Column(name = "petty_cash_details_voucher_number")
    private String petty_cash_details_voucher_number;

    @ManyToOne
    @JoinColumn(name = "ledger_account_id", referencedColumnName = "id")
    private LedgerAccount ledger_account_id;


}
