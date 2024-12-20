import ADVANTAGES_34 from '@/utils/data/ADVANTAGES_34.json';
import FIELDS_4 from '@/utils/data/FIELDS_4.json';

// Attention Indicator
export const ATTENTION_ANDICATOR = ['体谅', '伯乐', '包容', '责任', '审慎'];

/**
 * 根据pdf字符串数组获取个人能力
 * @param {*} pdfStrArray
 * @returns
 */
export const getPersonalStrengthByPDFStrArray = (pdfStrArray) => {
  const findCorrectSequence = pdfStrArray.find((str) => {
    // console.log(str, 'str');
    const flag = /^1.[\u4e00-\u9fa5]{2}/.test(str);
    return flag;
  });

  const talentOrderStr = findCorrectSequence.substring(0, findCorrectSequence.indexOf('34.') + 5);
  const regex = /\d+\.[\u4e00-\u9fa5]{2}/g;
  const talentOrders = talentOrderStr.match(regex).map((talent) => {
    const [key, value] = talent.split('.');
    return {
      key,
      value,
    };
  });

  return talentOrders;
};

export const getPersonNameByPDFStrArray = (pdfStrArray) => {
  const regex = /。([\s\S]*?)\|\|10-\d{2}-\d{4}StrengthsFinder®\|/;

  const findCorrectSequence = pdfStrArray.find((str) => {
    // console.log(str, 'str');
    const flag = new RegExp(regex).test(str);
    return flag;
  });
  let rawNameStr = '';
  debugger;
  if (findCorrectSequence) {
    // eslint-disable-next-line prefer-destructuring
    rawNameStr = findCorrectSequence.match(regex)[1];
  }
  return rawNameStr;
};

export const findAdvantage = (cname) => {
  // eslint-disable-next-line operator-linebreak
  const advantage = ADVANTAGES_34.find((item) => item.CName === cname) || {};
  // eslint-disable-next-line operator-linebreak
  const field = FIELDS_4.find((item) => item.fieldEName === advantage.Field) || {};

  return {
    ...advantage,
    ...field,
  };
};

export const generateUUID = () => {
  const str = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  return str.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const findMaxByStatistics = (data) => {
  console.log('%c [ data ]-73', 'font-size:13px; background:pink; color:#bf2c9f;', data);
  let max = Object.values(data)[0]; // 假设第一个值是最大的
  Object.values(data).forEach((value) => {
    if (value > max) {
      max = value;
    }
  });

  console.log(max);
  return max;
};

export const extractMatches = (arrayOfStrings) => {
  let name = '';
  const regex = /结果个性化定制。([^\s"]*)。成功运用([^\s"]*)\|\|/;
  const matches = arrayOfStrings
    .map((str) => {
      const match = str.match(regex);
      console.log(match, 'match');
      let formated = null;
      if (match) {
        formated = {};
        // eslint-disable-next-line prefer-destructuring
        formated.unsplitedDesc = match[1];
        formated.splitDesc = match[1].split('。').map((txt) => `${txt}。`);
        // eslint-disable-next-line prefer-destructuring
        const temp = match[2];
        const splitSpot = temp.lastIndexOf('。') + 1;

        formated.reason = temp.substring(5, splitSpot);

        if (!name) {
          const tempName = temp.substring(splitSpot);
          const halfLength = Math.floor(tempName.length / 2);
          name = tempName.substring(0, halfLength);
        }
      }

      return formated;
    })
    .filter((item) => !!item);

  return {
    matches,
    name,
  };
};

export default {
  ATTENTION_ANDICATOR,
};
