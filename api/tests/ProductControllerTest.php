<?php

class ProductControllerTest extends TestCase {

	public function testProduct()
	{
		$crawler = $this->client->request('GET', '/product/12');
		$this->assertTrue($this->client->getResponse()->isOk());
	}

}