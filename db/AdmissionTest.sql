CREATE DATABASE admissionTest;

use admissionTest;

CREATE TABLE bodegas(
    id BIGINT(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    id_responsable BIGINT(20) UNSIGNED NOT NULL ,
    estado TINYINT(4) NOT NULL,
    created_by BIGINT(20) UNSIGNED,
    update_by BIGINT(20) UNSIGNED,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL);

CREATE TABLE historiales (
    id BIGINT(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    cantidad INT(11) NOT NULL,
    id_bodega_origen BIGINT(20) UNSIGNED NOT NULL ,
    id_bodega_destino BIGINT(20) UNSIGNED NOT NULL ,
    id_inventario BIGINT(20) UNSIGNED NOT NULL ,
    created_by BIGINT(20) UNSIGNED,
    update_by BIGINT(20) UNSIGNED,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL);

CREATE TABLE inventarios (
    id BIGINT(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_bodega BIGINT(20) UNSIGNED NOT NULL,
    id_producto BIGINT(20) UNSIGNED NOT NULL,
    cantidad INT(11) NOT NULL,
    created_by BIGINT(20) UNSIGNED,
    update_by BIGINT(20) UNSIGNED,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL);

CREATE TABLE productos (
    id BIGINT(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    estado TINYINT(4) NOT NULL,
    created_by BIGINT(20) UNSIGNED ,
    update_by BIGINT(20) UNSIGNED,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL);

CREATE TABLE users (
    id BIGINT(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    email_verified_at TIMESTAMP,
    estado TINYINT(4) NOT NULL, 
    created_by BIGINT(20) UNSIGNED,
    update_by BIGINT(20) UNSIGNED,
    foto VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL);

ALTER TABLE productos
ADD CONSTRAINT userProduct
FOREIGN KEY (created_by) REFERENCES users(id);
ALTER TABLE productos
ADD CONSTRAINT userProUp
FOREIGN KEY (update_by) REFERENCES users(id);

ALTER TABLE bodegas
ADD CONSTRAINT userBodId
FOREIGN KEY (id_responsable) REFERENCES users(id);
ALTER TABLE bodegas
ADD CONSTRAINT userBodCre
FOREIGN KEY (created_by) REFERENCES users(id);
ALTER TABLE bodegas
ADD CONSTRAINT userBodUp
FOREIGN KEY (update_by) REFERENCES users(id);

ALTER TABLE inventarios
ADD CONSTRAINT userInvId
FOREIGN KEY (id_bodega) REFERENCES bodegas(id);
ALTER TABLE inventarios
ADD CONSTRAINT proInvId
FOREIGN KEY (id_producto) REFERENCES productos(id);
ALTER TABLE inventarios
ADD CONSTRAINT userInvCre
FOREIGN KEY (created_by) REFERENCES users(id);
ALTER TABLE inventarios
ADD CONSTRAINT userInvUp
FOREIGN KEY (update_by) REFERENCES users(id);

ALTER TABLE historiales
ADD CONSTRAINT bodHisIdO
FOREIGN KEY (id_bodega_origen) REFERENCES bodegas(id);
ALTER TABLE historiales
ADD CONSTRAINT bodHisIdD
FOREIGN KEY (id_bodega_destino) REFERENCES bodegas(id);
ALTER TABLE historiales
ADD CONSTRAINT userHisIdCre
FOREIGN KEY (created_by) REFERENCES users(id);
ALTER TABLE historiales
ADD CONSTRAINT userHisIdUp
FOREIGN KEY (update_by) REFERENCES users(id);
ALTER TABLE historiales
ADD CONSTRAINT invHisId
FOREIGN KEY (id_inventario) REFERENCES inventarios(id);

