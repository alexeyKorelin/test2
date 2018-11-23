import * as C from './controller';
import Cookies from 'universal-cookie';
import {languages} from 'utils/const';

const obtainCookies = (req) => {
  const cooks = new Cookies(req.headers.cookie);
  const langFromParams = req.query.lng && languages.includes(req.query.lng)
  if (langFromParams) {
    req.res.cookie('locale', req.query.lng)
  }
  return {
    userAgent: req.headers['user-agent'],
    locale: langFromParams ? req.query.lng : cooks.get('locale'),
    token: cooks.get('authToken'),
  };
}

const generalRedirect = app => (req, res, next) => {
  const cookieOptions = obtainCookies(req);
  C.handleIndex(cookieOptions)
    .then(data => {
      if (data.auth.user || req.query.action) {
        app.render(req, res, '/main', { initialState: data });
      } else {
        app.render(req, res, '/landing', { initialState: data });
      }
    })
}

const index = app => (req, res, next) => {
  const cookieOptions = obtainCookies(req);
  C.handleIndex(cookieOptions)
    .then(data => {
      app.render(req, res, '/main', { initialState: data });
    })
};

const about = app => (req, res, next) => {
  const cookieOptions = obtainCookies(req);
  C.handleDefault(cookieOptions)
    .then(data => {
      app.render(req, res, '/about', { initialState: data });
    })
};

const help = app => (req, res, next) => {
  const cookieOptions = obtainCookies(req);
  C.handleDefault(cookieOptions)
    .then(data => {
      app.render(req, res, '/help', { initialState: data });
    })
};

const me = app => (req, res, next) => {
  const cookieOptions = obtainCookies(req);
  C.handleMe(cookieOptions)
    .then(data => {
      app.render(req, res, '/me', { initialState: data });
    })
};

const likes = app => (req, res, next) => {
  const cookieOptions = obtainCookies(req);

  C.handleDefault(cookieOptions)
    .then(data => {
      app.render(req, res, '/likes', { initialState: data });
    })
};

const ads = app => (req, res, next) => {
  const cookieOptions = obtainCookies(req);
  C.handleDefault(cookieOptions)
    .then(data => {
      app.render(req, res, '/ads', { initialState: data });
    })
};

const search = app => (req, res, next) => {
  const cookieOptions = obtainCookies(req);
  const query = req.query.query
  C.handleSearch(query, cookieOptions)
    .then(data => {
      app.render(req, res, '/search', { initialState: data });
    })
};

const ad = app => (req, res, next) => {
  const {category, subcategory, ad} = req.params;
  if (category && subcategory && ad) {
    const cookieOptions = obtainCookies(req);
    C.handleAd(ad, cookieOptions)
      .then(data => {
        app.render(req, res, '/ad', { initialState: data });
      })
  } else {
    next();
  }
};

const editAd = app => (req, res, next) => {
  const cookieOptions = obtainCookies(req);
  const { ad } = req.params;
  C.handleEditAd(ad, cookieOptions)
    .then(data => {
      app.render(req, res, '/edit_ad', { initialState: data });
    })
};

const subcategory = app => (req, res, next) => {
  const {category, subcategory} = req.params;
  if (category && subcategory) {
    const cookieOptions = obtainCookies(req);
    C.handleSubcategory(category, subcategory, cookieOptions)
      .then(data => {
        app.render(req, res, '/subcategory', { initialState: data });
      })
  } else {
    next();
  }
};

const category = app => (req, res, next) => {
  const {category} = req.params;
  if (category) {
    const cookieOptions = obtainCookies(req);
    C.handleCategory(category, cookieOptions)
      .then(data => {
        app.render(req, res, '/category', { initialState: data });
      })
  } else {
    next();
  }
};

const singleUser = app => (req, res, next) => {
  const {singleUser} = req.params;
  if (singleUser) {
    const cookieOptions = obtainCookies(req);
    C.handleUser(singleUser, cookieOptions)
      .then(data => {
        app.render(req, res, '/user', { initialState: data });
      })
  } else {
    next();
  }
};

const singleShop = app => (req, res, next) => {
  const {singleShop} = req.params;
  if (singleShop) {
    const cookieOptions = obtainCookies(req);
    C.handleShop(singleShop, cookieOptions)
      .then(data => {
        app.render(req, res, '/shop', { initialState: data });
      })
  } else {
    next();
  }
};

const shops = app => (req, res, next) => {
  const cookieOptions = obtainCookies(req);
  C.handleDefault(cookieOptions)
    .then(data => {
      app.render(req, res, '/shops', { initialState: data });
    })
};

const newAd = app => (req, res, next) => {
  const cookieOptions = obtainCookies(req);
  C.handleDefault(cookieOptions)
    .then(data => {
      app.render(req, res, '/new_ad', { initialState: data });
    })
};

const landing = app => (req, res, next) => {
  const cookieOptions = obtainCookies(req);
  C.handleDefault(cookieOptions)
    .then(data => {
      app.render(req, res, '/landing', { initialState: data });
    })
};

const ico = app => (req, res, next) => {
  const cookieOptions = obtainCookies(req);
  C.handleDefault(cookieOptions)
    .then(data => {
      app.render(req, res, '/ico', { initialState: data });
    })
};

const notFound = app => (req, res, next) => {
  const cookieOptions = obtainCookies(req);
  C.handleDefault(cookieOptions)
    .then(data => {
      app.render(req, res, '/not_found', { initialState: data });
    })
};

module.exports = {
  generalRedirect,
  index,
  about,
  help,
  me,
  likes,
  ads,
  ad,
  search,
  subcategory,
  category,
  singleUser,
  singleShop,
  shops,
  newAd,
  editAd,
  landing,
  notFound,
  ico
};
