class Department {
  constructor(data) {
    this.department_id = data.department_id || 0;
    this.title = data.title || '';
    this.description = data.description || '';
    this.is_active = data.is_active == true ? true : false;
  }

  select(strwhere) {
    const strquery = `select * from tbl_department where 1=1 ${strwhere}`;
    return strquery;
  }

  selectcolumn(column, strwhere) {
    const strquery = `select ${column} from tbl_department where 1=1 ${strwhere}`;
    return strquery;
  }

  getcount(strwhere) {
    const strquery = `select count(*) as count from tbl_department where 1=1 ${strwhere}`;
    return strquery;
  }

  insert() {
    const query = `insert into tbl_department (title, description, is_active) values (?, ?, ?)`;
    const values = [this.title, this.description, this.is_active, this.created_at, this.updated_at];
    return { query, values };
  }

  update() {
    const query = `update tbl_department set title = ?, description = ?, is_active = ? where department_id = ?`;
    const values = [this.title, this.description, this.is_active, this.department_id];
    return { query, values };
  }

  updatecolumn(column, strwhere) {
    const query = `update tbl_department set ${column} where 1=1 ${strwhere}`;
    return query;
  }

  delete(strwhere) {
    const query = `delete from tbl_department where 1=1 ${strwhere}`;
    return query;
  }
}

module.exports = Department;
