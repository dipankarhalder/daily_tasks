// get items
export const _getListOfItems = (DBModel: any) => {
  return DBModel.find();
};
export const _getListById = (DBModel: any, id: string) => {
  return DBModel.findById(id);
};
export const _getListByField = (
  DBModel: any,
  field: string
) => {
  return DBModel.findOne({ field });
};

// create item
export const _createItem = (
  DBModel: any,
  values: Record<string, any>
) => {
  return new DBModel(values)
    .save()
    .then((item: any) => item.toObject());
};

// update item
export const _updateItemById = (
  DBModel: any,
  id: string,
  values: Record<string, any>
) => {
  return DBModel.findByIdAndUpdate(id, values);
};

// delete item
export const _deleteItemById = (
  DBModel: any,
  id: string
) => {
  return DBModel.findOneAndDelete({ _id: id });
};
