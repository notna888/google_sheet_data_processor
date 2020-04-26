

function load_gsheet_data(url_to_get) {
  data_fetched = {'head':['Error'], 'rows':[{'Error':'An error occurred'}]}

  // Need to come up with some way so I can make these requests without async: false
  $.ajax({
    type: "GET",
    url: url_to_get,
    async: false,
    dataType: "text",
    success: function(data) {
      data_fetched = processData(data);
      return data_fetched
    },
    error: function(){ alert('Something went wrong?')}
  });

  return data_fetched
}

function processData(data) {
  processed_rows = [];
  all_rows = data.split(/\r?\n/);
  // console.log(data);

  // How do I handle it if there's data which contains a comma? I could move to a tab seperated format maybe??
  for (i = 0; i < all_rows.length; i++) {
    row = all_rows[i];
    if(i == 0){
      // we're doing the header
      headers = row.split(',');
    }else{
      row_items = row.split(',');
      row_dict = {}
      for (ii = 0; ii < row_items.length; ii++){
        row_dict[headers[ii]] = row_items[ii]
      }
      processed_rows.push(row_dict)
    }
  }
  // console.log(processed_rows)
  ret_data = {
    "head": headers,
    "rows": processed_rows,
  }
  return ret_data
}

function json_dict_to_divs(div_to_append_to, data) {
  // console.log(data)
  headers = data["head"]
  rows = data["rows"]

  header_row = '<div class="main_table_row header_row">'
  for (i = 0; i < headers.length; i++) {
    this_cell = '<span>' + headers[i] + '</span>'
    header_row += this_cell
  }
  header_row += '</div>'

  $('#' + div_to_append_to).append(header_row)


  for (i = 0; i < rows.length; i++) {
    row = rows[i]
    this_row = '<div class="main_table_row">'

    for (var ii = 0; ii < headers.length; ii++) {
      col_name = headers[ii]
      this_cell = '<span>' + row[col_name] + '</span>'
      this_row += this_cell
    }

    this_row += '</div>'

    console.log(this_row)

    $('#' + div_to_append_to).append(this_row)
  }

  // Make sure the columns are evenly spaced :)
  $(".main_table_row").css('gridTemplateColumns', 'repeat(' + headers.length + ', auto)')
}
