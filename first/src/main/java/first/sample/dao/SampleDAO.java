package first.sample.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import first.common.dao.AbstractDAO;

@Repository("sampleDAO")
public class SampleDAO  extends AbstractDAO{

	public List<Map<String, Object>> selectBoardList(Map<String, Object> map) {
		
		return (List<Map<String, Object>>)selectList("sample.selectBoardList", map);

		
		
	}

	public List<Map<String, Object>> selectCustomList(Map<String, Object> map) {
		
		return (List<Map<String, Object>>)selectList("mcsale.selectCustomList", map);
	}

	public void insertBoard(Map<String, Object> map) throws Exception{
		
		insert("sample.insertBoard",map);
		
	}

	
}
