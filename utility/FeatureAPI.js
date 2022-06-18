class FeatureAPI {
  constructor(clientQuery, databaseQuery) {
    this.clientQuery = clientQuery;
    this.databaseQuery = databaseQuery;
  }
  filter() {
    const queryObj = { ...this.clientQuery };
    const deleQueries = ["field", "sort", "page", "limit"];
    deleQueries.forEach((val) => {
      delete queryObj[val];
    });

    let queryClient = JSON.stringify(this.clientQuery);

    const queryData = JSON.parse(
      queryClient.replace(/\bgt|gte|lte|lt\b/g, (val) => `$${val}`)
    );

    this.databaseQuery = this.databaseQuery.find(queryData);
    return this;
  }

  sorting() {
    if (this.clientQuery.sort) {
      let sortData = this.clientQuery.sort.split(",").join(" ");
      this.databaseQuery = this.databaseQuery.sort(sortData);
    } else {
      this.databaseQuery = this.databaseQuery.sort("-createAt");
    }
    return this;
  }
  // Selecting fields
  field() {
    if (this.clientQuery.field) {
      let fieldData = this.clientQuery.field.split(",").join(" ");

      this.databaseQuery = this.databaseQuery.select(fieldData);
    } else {
      this.databaseQuery = this.databaseQuery.select("-__v");
    }
    return this;
  }

  // Pagination
  pagination() {
    const page = +this.clientQuery.page || 1;
    const limit = +this.clientQuery.limit || 3;
    this.databaseQuery = this.databaseQuery
      .skip((page - 1) * limit)
      .limit(limit);
    return this;
  }
}

module.exports = FeatureAPI;
