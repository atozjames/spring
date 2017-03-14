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

	
}
