package first.sample.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import first.sample.dao.SampleDAO;

@Service("sampleService")
public class SampleServiceImpl implements SampleService{

	 Logger log = LoggerFactory.getLogger(this.getClass());
	 
	 @Resource(name="sampleDAO")
	 private SampleDAO sampleDAO;


	
	@Override
	public List<Map<String, Object>> selectBoardList(Map<String, Object> map) throws Exception {
		
		return sampleDAO.selectBoardList(map);

		
	}



	@Override
	public List<Map<String, Object>> selectCustomList(Map<String, Object> map) throws Exception {
		
		return sampleDAO.selectCustomList(map);
	}


    //게시판 등록
	@Override
	public void insertBoard(Map<String, Object> map) throws Exception{
		// TODO Auto-generated method stub
	
		sampleDAO.insertBoard(map);
	}


    //게시글 내용 가져 오기
	@Override
	public Map<String, Object> selectBoardDetail(Map<String, Object> map) {
		
   		    //카운트 숫자 업데이트
			sampleDAO.updateHitCnt(map);
		
   		    Map<String, Object> resultMap = sampleDAO.selectBoardDetail(map);
		    return resultMap;

	}



	@Override
	public void updateBoard(Map<String, Object> map) {
		// TODO Auto-generated method stub
		
		sampleDAO.update("sample.updateBoard", map);
		
	}



	@Override
	public void deleteBoard(Map<String, Object> map) {
		
		sampleDAO.delete("sample.deleteBoard", map);
		
	}

	
}
