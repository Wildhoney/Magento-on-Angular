<?php

class ProductsControllerTest extends TestCase {

	public function testProducts()
	{
		$crawler = $this->client->request('GET', '/products');
		$this->assertTrue($this->client->getResponse()->isOk());
	}

}