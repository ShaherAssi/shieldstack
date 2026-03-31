package com.shieldstack.api.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // DB currently stores names like 'ADMIN' (per your V2 seed). Keep it string.
    @Column(nullable = false, unique = false)
    @Enumerated(EnumType.STRING)
    private RoleName name;

    // Your V2 seed uses org_id; we don't model Organization now, keep orgId as a column.
    @Column(name = "org_id")
    private Long orgId;
}
