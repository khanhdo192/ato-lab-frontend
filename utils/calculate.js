export function dateDifference(date1, date2) {
  return parseInt(Math.abs(date1 - date2) / 1000 / 60 / 60 / 24);
}

export const getDate = createdTime => {
  return createdTime ? new Date(createdTime).toISOString().split('T')[0] : '';
};

export const sortSession = (a, b) => {
  if (!!a.id && !!b.id) {
    if (a.session > b.session) return -1;
    else if (a.session < b.session) return 1;
    else return 0;
  }
  return 0;
};

export function progress(subscription) {
  if (subscription.activated === null) {
    return 0;
  }

  const now = new Date();
  const activated = new Date(subscription.activated);

  if (now <= activated) {
    return 0;
  }

  const valid = new Date(subscription.validUntil);
  if (now >= valid) {
    return 100;
  }

  return (
    (dateDifference(now, activated) / dateDifference(valid, activated)) * 100
  );
}
