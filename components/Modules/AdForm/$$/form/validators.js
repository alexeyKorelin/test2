export const addressIsFull = (t) => {
  return ({ field }) => {
    let isEmpty = false;
    let isNotFull = false;
    
    field.fields.forEach(f => {
      f.validate();
      if (f.isDirty && !f.isValid) {
        isNotFull = true;
      } else if (!f.isDirty && !f.isValid) {
        isEmpty = true;
      }
    });
  
    if (isNotFull) {
      return [false, t('createAd.fields.geo.enterMorePrecisely', { field: field.label })];
    }
  
    if (isEmpty) {
      const word = field.extra.type == 'city' ? t('createAd.fields.geo.onlyCity') : t('createAd.fields.geo.full')
      return [false, t('createAd.fields.geo.youMustSpecify', { word: word })];
    }
  
    return [true];
  }
}

export const advertHasImages = (t) => {
  return ({ field }) => {
    if (!field.value || field.value.length < 1) {
      return [false, t('createAd.fields.images.need')]
    }
    return [true];
  }
}
