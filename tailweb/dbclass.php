<?php
define('DB_SERVER', "localhost");
define('DB_USER', "root");
define('DB_PASS', "");
define('DB_DATABASE', "tailwebproject");
class Database {
    private $connection;

    public function __construct() {
         $this->connection = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);
        if ($this->connection->connect_error) {
            throw new Exception("Connection failed: " . $this->connection->connect_error);
        }
    }
    public function runQuery($query) {
        $result = $this->connection->query($query);
        if ($result) {
            return true;
        } else {
            throw new Exception("Query failed: " . $this->connection->error);
        }
    }
    public function fetch($query, $type = MYSQLI_ASSOC) {
        $result = $this->connection->query($query);
        if ($result) {
            return $result->fetch_array($type);
        } else {
            throw new Exception("Query failed: " . $this->connection->error);
        }
    }

    public function queryAll($query, $type = MYSQLI_ASSOC) {
        $result = $this->connection->query($query);
        if ($result) {
            $records = $result->fetch_all($type);
            return $records;
        } else {
            throw new Exception("Query failed: " . $this->connection->error);
        }
    }
    public function queryAssoc($query) {
        $result = $this->connection->query($query);
        if ($result) {
            return $result->fetch_assoc();
        } else {
            throw new Exception("Query failed: " . $this->connection->error);
        }
    }
    public function queryUniqueValue($table, $column, $where) {
        $query = "SELECT $column FROM $table WHERE $where";
        $result = $this->connection->query($query);

        if ($result) {
            $row = $result->fetch_assoc();
            if ($row) {
                return $row[$column];
            } else {
                return null; // No matching row found
            }
        } else {
            throw new Exception("Query failed: " . $this->connection->error);
        }
    }
    public function close() {
        $this->connection->close();
    }
}
