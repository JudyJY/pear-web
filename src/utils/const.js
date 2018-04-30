export const APP_NAME = '蜘蛛'

export const API_HOST = process.env.pear_web_api_host || 'http://localhost:7777'

export const CRAWLER_Status = {
    0: '进行中',
    1: '成功',
    2: 'exception'
}

// 词性标记
export const WORD_MAP = {
    'Ag': '形语素',
    'a': '形容词',
    'ad': '副形词',
    'an': '名形词',
    'b': '区别词',
    'c': '连词',
    'Dg': '副语素',
    'd': '副词',
    'e': '叹词',
    'f': '方位词',
    'g': '语素',
    'h': '前接成分',
    'i': '成语',
    'j': '简称略语',
    'k': '后接成分',
    'l': '习用语',
    'm': '数词',
    'Ng': '名语素',
    'n': '名词取',
    'nr': '人名名',
    'ns': '地名名',
    'nt': '机构团体',
    'nz': '其他专名',
    'o': '拟声词',
    'p': '介词',
    'q': '量词',
    'r': '代词',
    's': '处所词',
    'Tg': '时语素',
    't': '时间词',
    'u': '助词',
    'Vg': '动语素',
    'v': '动词',
    'vd': '副动词',
    'vn': '名动词',
    'w': '标点符号',
    'x': '非语素字',
    'y': '语气词',
    'z': '状态词',
}