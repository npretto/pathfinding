/**
 * like Object.entries but for {byId:{}, allIds:[]} type of things
 *  */
export const entries = object => object.allIds.map(id => [id, object.byId[id]])
