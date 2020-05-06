Table products {
  id int [pk, increment]
  category_id int
  user_id int
  name text [not null]
  description text [not null]
  old_price int
  price int [not null]
  quantity int [default: 0]
  status int [default: 1]
  created_at timestamp [default: 'now()']
  updated_at timestamp [default: 'now()']
}

Table categories {
  id int [pk, increment]
  name text [not null]
}

Table files {
  id int [pk, increment]
  name text
  path text [not null]
  product_id int
}

Ref: products.category_id > categories.id
Ref: files.product_id > products.id