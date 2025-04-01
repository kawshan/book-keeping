package com.packleaf.bookkeeping.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "from_account")
@AllArgsConstructor
@NoArgsConstructor
public class FromAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "account_name")
    private String account_name;

    @Column(name = "account_number")
    private String account_number;

    @ManyToOne
    @JoinColumn(name = "company_master_id", referencedColumnName = "id")
    private CompanyMaster company_master_id;





}
