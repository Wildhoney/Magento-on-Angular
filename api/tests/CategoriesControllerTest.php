<?php

class CategoriesControllerTest extends TestCase {

	public function testProduct()
	{
		$crawler = $this->client->request('GET', '/categories');
		$this->assertTrue($this->client->getResponse()->isOk());
	}

}