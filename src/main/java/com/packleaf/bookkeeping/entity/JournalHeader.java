package com.packleaf.bookkeeping.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "journal_header")
@AllArgsConstructor
@NoArgsConstructor
public class JournalHeader {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "journal_header_key")
    private String journal_header_key;

    @Column(name = "journal_header_description")
    private String journal_header_description;

    @Column(name = "journal_header_date")
    private LocalDate journal_header_date;

    @ManyToOne
    @JoinColumn(name = "company_master_id", referencedColumnName = "id")
    private CompanyMaster company_master_id;






}
