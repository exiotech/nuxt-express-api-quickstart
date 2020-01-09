import _ from 'lodash';
import mongoose from 'mongoose';
import crypto from 'crypto';

export function ExtendableBuiltin(cls) {
  function ExtendableBuiltin(...args) {
    // eslint-disable-line no-shadow
    Reflect.apply(cls, this, args);
  }
  ExtendableBuiltin.prototype = Object.create(cls.prototype);
  Reflect.setPrototypeOf(ExtendableBuiltin, cls);

  return ExtendableBuiltin;
}

export function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function parseQueryOptions(query, defs = {}) {
  const options = JSON.parse(JSON.stringify(defs));
  const { page = 1, page_size: pageSize = 100, populate } = query;
  options.page = Number(page);
  options.limit = Number(pageSize);
  options.deleted = query.deleted || false;
  options.populate = preparePopulate(populate);
  if (query.sort_by) {
    let sortBy = query.sort_by;
    if (sortBy === 'id') {
      sortBy = '_id';
    }
    options.sort = {};
    options.sort[sortBy] = query.sort_in === 'DESC' ? -1 : 1;
  }
  return options;
}

export function createResponse(data, message = null, status = 200) {
  const success = status < 400;
  return {
    success,
    message,
    data
  };
}

export const createNotification = (notification, registrationToken) => {
  //instead of registrationToken can also be topic and condition
  const message = {
    notification,
    token: registrationToken
  };

  return message;
};

export const parseFormField = data => {
  return data
    .split('[')
    .join(' ')
    .replace(new RegExp(']', 'g'), '')
    .split(' ');
};

export const specifyLanguage = (languages, model, lng) => {
  languages.forEach(field => {
    let [fields, mults] = field.split('.*.');
    if (!mults) {
      _.set(model, fields, _.get(model, `${fields}.${lng}`));
    } else {
      _.set(
        model,
        fields,
        _.get(model, fields).map(el => {
          return _.set(el, mults, _.get(el, `${mults}.${lng}`));
        })
      );
    }
  });
  return model;
};

export const getTimestamp = id => {
  return new Date(mongoose.Types.ObjectId(id).getTimestamp()).getTime();
};

export const createPaymentUrl = id => {
  return `https://testpayments.ameriabank.am/forms/frm_paymentstype.aspx?paymentid=${id}&lang=en`;
};

export const getRequestUrl = req => {
  return `${req.protocol}://${req.get('host')}`;
};

export const hashCode = string => {
  let hash = 0;
  let chr;
  if (string.length === 0) return hash;
  for (let i = 0; i < string.length; i++) {
    chr = string.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

export const filterPaths = (populate = [], model) => {
  return populate.filter(
    field =>
      model.schema.paths[field] &&
      model.schema.paths[field].instance === 'ObjectID'
  );
};

export const preparePopulate = (populate = []) => {
  let query = [];
  populate.forEach(path => {
    query.push({ path });
  });
  return query;
};

export const setFileName = (req, model) => {
  if (!model) model = req.body;

  req.files.forEach(file => {
    _.set(
      model,
      file.fieldname,
      file.path.replace('public/', 'https://monamie.exio.tech/')
    );
  });

  return model;
};

export const flattenKeys = (obj, path = []) =>
  !_.isObject(obj)
    ? { [path.join('.')]: obj }
    : _.reduce(
        obj,
        (cum, next, key) => _.merge(cum, flattenKeys(next, [...path, key])),
        {}
      );

export const createHash = () => {
  const current_date = new Date().valueOf().toString();
  const random = Math.random().toString();
  return crypto
    .createHash('md5')
    .update(current_date + random)
    .digest('hex');
};

export const formatUSD = (amount) => {
  return `$${(amount / 100).toFixed(2)}`;
};

export const formatStripeAmount = (USDString) => {
  return parseFloat(USDString) * 100;
};
