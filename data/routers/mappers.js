module.exports = {
  intToBoolean,
  booleanToint,
  projectToBody,
  actionToBody,
  contextToBody
};

function intToBoolean(int) {
  return int === 1 ? true : false;
}

function booleanToint(bool) {
  return bool === true ? 1 : 0;
}

function projectToBody(project) {
  const result = {
    ...project,
    completed: intToBoolean(project.completed),
  };

  if (project.actions) {
    result.actions = project.actions.map(action => ({
      ...action,
      completed: intToBoolean(action.completed),
    }));
  }

  return result;
}

function contextToBody(project) {
  const result = {
    ...context,
  };

  if (action.contexts) {
    result.contexts = action.contexts.map(context => ({
      ...context,
    }));
  }

  return result;
}

function actionToBody(action) {
  return {
    ...action,
    completed: intToBoolean(action.completed),
  };
}
