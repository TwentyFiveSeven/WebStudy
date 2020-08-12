var HashMap = require('./HashMap.js')

describe('HashMap Test', function() {
    let mHashMap = new HashMap();
    mHashMap.make();
        
    it('[Put] 기존에 존재하지 않는 Key를 Put할 때', function(done) {
        mHashMap.put("aab", "ab");
        mHashMap.put("ccb", "abc");
        if(mHashMap.size() == 2)
            done();
        else{
            throw Error('size = 2 가 아닙니다.');
        }
    });

    it('[Put] 기존에 존재하는 Key를 Put 할 때', function(done) {
        mHashMap.put("aab", "ab");
        mHashMap.put("ccb", "abc");
        if(mHashMap.size() == 2)
            done();
        else{
            throw Error('size = 2 가 아닙니다.');
        }
    });

    it('[Replace] 키-값으로 기존 값을 대체할 때', function(done) {
        mHashMap.replace("aab", "abcde");
        if(mHashMap.getValue("aab") == "abcde")
            done();
        else{
            throw Error('abcde가 아닙니다.');
        }
    });

    it('[Replace] 키-값으로 기존에 없는 값을 대체할 때', function(done) {
        mHashMap.replace("aabc", "abcde");
        if(mHashMap.size() == 3)
            done();
        else{
            throw Error('size = 3 이 아닙니다.');
        }
    });

    it('[Size] 전체 아이템 개수를 리턴한다.', function(done) {
        if(mHashMap.size() == 3)
            done();
        else{
            throw Error('size = 3 이 아닙니다.');
        }
    });

    it('[Remove] 존재하는 키값을 제거', function(done) {
        mHashMap.remove("aabc");
        if(mHashMap.contains("aabc") === false)
            done();
        else{
            throw Error('삭제되지 않았습니다.');
        }
    });

    it('[Remove] 존재하지않는 키값을 제거', function(done) {
        let size = mHashMap.size();
        mHashMap.remove("aabcabsdf");
        if(mHashMap.size() == size)
            done();
        else{
            throw Error('다른 키가 삭제되었습니다.');
        }
    });

    it('[Keys] 전체 키 목록을 [String] 배열로 리턴', function(done) {
        let list = mHashMap.keys().sort();
        let check = ['aab', 'ccb'];
        if(list.length != check.length)
            throw Error('전체 키 목록과 다릅니다.');
        for(let i = 0;i<list.length;i++)
            if(list[i] != check[i])
                throw Error('전체 키 목록과 다릅니다.');
        done();
    });

    it('[getValue] 해당 키와 매치되는 값을 찾아서 리턴할 때', function(done) {
        mHashMap.put("aabbbaa", "abbbbbb");
        mHashMap.put("zxc", "abasfaac");
        if(mHashMap.getValue("zxc")== "abasfaac")
            done();
        else{
            throw Error('매치되는 값이 없습니다.');
        }
    });

    it('[getValue] 해당 키와 매치되는 값이 없을 때', function(done) {
        if(mHashMap.getValue("zzzxc")== null)
            done();
        else{
            throw Error('매치되는 값이 있습니다.');
        }
    });

    it('[Contains] 해당 키가 존재할 때', function(done) {
        if(mHashMap.contains("zxc")== true)
            done();
        else{
            throw Error('해당키가 존재 하지않습니다..');
        }
    });

    it('[Contains] 해당 키가 존재하지 않을 때 ', function(done) {
        if(mHashMap.contains("bbbbbbbbbbbbbbbbba")== false)
            done();
        else{
            throw Error('해당키가 존재 합니다.');
        }
    });

    it('[isEmpty] 비어있는 맵인지 Bool 결과를 리턴한다.', function(done) {
        if(mHashMap.isEmpty()== false)
            done();
        else{
            throw Error('맵이 비어있지 않습니다.');
        }
    });

    it('[Clear] 전체 맵을 초기화한다.', function(done) {
        mHashMap.clear();
        if(mHashMap.isEmpty()== true)
            done();
        else{
            throw Error('초기화되지 않았습니다.');
        }
    });

    it('[IncreaseBucketSize] 하나의 Storage안에 Key-Value쌍이 BucketSize*2보다 커지면 BucketSize를 늘리고 새로운 Storage에 Key-Value쌍들을 다시 재배치한다.', function(done) {
        for(let i =0; i<16*8;i++)
            mHashMap.put("abc"+i.toString(),"testValue");
        if(mHashMap.bucket_size > 8)
            done();
        else{
            throw Error('BucketSize가 증가하지 않았습니다.');
        }
    });
});
